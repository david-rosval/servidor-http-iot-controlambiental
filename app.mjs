import express from 'express'
import db from './db/conn.mjs'
import cors from 'cors'

const PORT = process.env.PORT ?? 1234
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Conectado a la API controlambiental'})
})

app.get('/sensors-data', async (req, res) => {
  let collection = await db.collection('sensores')
  let results = await collection.find({}).toArray()
  res.send(results).status(200)
})

app.post('/sensors-data', async (req, res) => {
  let collection = await db.collection('sensores')
  let newDocument = req.body
  newDocument.date = new Date()
  let result = await collection.insertOne(newDocument)
  res.send(result).status(204)
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})