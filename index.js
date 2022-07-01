require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())

/**
 * Serve the production-build of the frontend in folder /build
 * Was built from repo 'fullstackopen-2022', folder part3/lesson-code-frontend
 */
app.use(express.static('build'))

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
    content: "HTML is easy.",
    date: "2022-05-30T17:30:31.098Z",
    important: false
  },
  {
    id: 2,
    content: "Browser can execute only Javascript!",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol.",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

/**
 * GET all notes
 */
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => response.json(notes))
})

/**
 * GET individual note
 */
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // Don't forget to convert from string to Number
  const note = notes.find(note => note.id === id)
  if (note) response.json(note)
  else response.status(404).end()
})

/**
 * Generate a new id
 * @returns {number} new id
 */
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

/**
 * POST a new note
 */
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

/**
 * PUT: Change a note
 */
app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const body = request.body
  // Abort if note is not on the server
  if (!notes.find(note => note.id === id)) {
    return response.status(404).json({error: `The note with id='${id}' is not on the server!`})
  }

  // Abort if there is no valid body
  if (!body.content) return response.status(400).json({error: 'content missing (JSON expected)'})

  const changedNote = {
    id,
    content: body.content,
    important: body.important || false,
    date: body.date || new Date(),
  }

  notes = notes.map(note => note.id === id
    ? changedNote
    : note
  )

  response.json(changedNote)
})

/**
 * DELETE a note
 */
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

/**
 * Answer for all other (unknown) endpoints)
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint!'})
}
app.use(unknownEndpoint)

/**
 * Run app
 */
const PORT = process.env.PORT
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL
app.listen(PORT, () => {
  if (LOCAL_HOST_URL) console.log(`Server running at ${LOCAL_HOST_URL}:${PORT}`)
  else console.log(`Server running at Port=${PORT}`)
})
