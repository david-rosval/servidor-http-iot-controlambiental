import express from 'express'
import db from './db/conn.js'
import cors from 'cors'
import { validateSensorsData } from './schemas/sensors-data.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Conectado a la API controlambiental' })
})

app.get('/sensors-data', async (req, res) => {
  const collection = await db.collection('sensores')
  const results = await collection.find({}).toArray()
  res.send(results).status(200)
})

app.get('/sensors-data/:data', (req, res) => {
  res.json({ message: 'data' })
})

app.post('/sensors-data', async (req, res) => {
  const sensorsData = req.body
  const validationResult = validateSensorsData(sensorsData)
  if (validationResult.error) {
    return res.status(400).json({ error: JSON.parse(validationResult.error.message) })
  }
  const newDocument = {
    ...validationResult.data,
    date: new Date()
  }
  const collection = await db.collection('sensores')
  const result = await collection.insertOne(newDocument)
  res.send(result).status(204)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
