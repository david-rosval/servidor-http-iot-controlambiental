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

app.get('/sensors-data/current', async (req, res) => {
  const collection = await db.collection('sensores')
  const result = await collection.findOne({}, { sort: { _id: -1 } })
  res.send(result)
})

app.get('/sensors-data/last-:count', async (req, res) => {
  const { count } = req.params
  if (isNaN(count)) {
    return res.json({ message: 'Invalid param, must be a integer. example: /last-5' })
  }
  const collection = await db.collection('sensores')
  const result = await collection.find({}).sort({ _id: -1 }).limit(parseInt(count)).toArray()
  res.send(result)
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

app.delete('/sensors-data', async (req, res) => {
  const collection = await db.collection('sensores')
  const deleteResult = await collection.deleteMany({})
  console.log('Deleted all documents =>', deleteResult)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
