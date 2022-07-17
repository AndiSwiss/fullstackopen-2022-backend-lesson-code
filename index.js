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

/**
 * GET all notes
 */
app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then(notes => response.json(notes))
    .catch(error => next(error))
})

/**
 * GET individual note
 */
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) response.json(note)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

/**
 * POST a new note
 */
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  // Abort if there is no valid body
  if (!body.content) return response.status(400).json({error: 'content missing (JSON expected)'})

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))
})

/**
 * PUT: Change a note
 */
app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    {content, important},
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

/**
 * DELETE a note
 */
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

/**
 * Answer for all other (unknown) endpoints)
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint!'})
}
app.use(unknownEndpoint)

/**
 * Error handler middleware
 */
const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') return response.status(400).send({error: 'malformatted id'})
  else if (error.name === 'ValidationError') return response.status(400).json({error: error.message})

  next(error)
}
app.use(errorHandler)


/**
 * Run app
 */
const PORT = process.env.PORT
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL
app.listen(PORT, () => {
  if (LOCAL_HOST_URL) console.log(`Server running at ${LOCAL_HOST_URL}:${PORT}`)
  else console.log(`Server running at Port=${PORT}`)
})
