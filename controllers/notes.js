const notesRouter = require('express').Router()
const Note = require('../models/note')

/**
 * GET all notes
 */
notesRouter.get('/', async (request, response, next) => {
  // Note.find({})
  //   .then(notes => response.json(notes))
  //   .catch(error => next(error))

  // New, with async/await => https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend
  // But: What about the error-handler??
  const notes = await Note.find({})
  response.json(notes)
})

/**
 * GET individual note
 */
notesRouter.get('/:id', (request, response, next) => {
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
notesRouter.post('/', (request, response, next) => {
  const body = request.body

  // Abort if there is no valid body
  if (!body.content) return response.status(400).json({ error: 'content missing (JSON expected)' })

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save()
    .then(savedNote => response.status(201).json(savedNote))
    .catch(error => next(error))
})

/**
 * PUT: Change a note
 */
notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

/**
 * DELETE a note
 */
notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

module.exports = notesRouter
