const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

// GET '/' => hello world
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// GET all notes
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// GET individual note
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // Don't forget to convert from string to Number
  const note = notes.find(note => note.id === id)
  if (note) response.json(note)
  else response.status(404).end()
})

// Generate a new id
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

// POST a new note
app.post('/api/notes', (request, response) => {
  const body = request.body

  // Abort if there is no valid body
  if (!body.content) return response.status(400).json({error: 'content missing (JSON expected)'})

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
    date: new Date(),
  }
  notes = notes.concat(note)
  response.json(note)
})

// DELETE a note
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

// Run app
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
