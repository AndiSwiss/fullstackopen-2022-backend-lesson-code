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
  try {
    const notes = await Note.find({})
    response.json(notes)
  } catch (exception) {
    next(exception)
  }
})

/**
 * GET individual note
 */
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) response.json(note)
    else response.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

/**
 * POST a new note
 */
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  // note.save()
  //   .then(savedNote => response.status(201).json(savedNote))
  //   .catch(error => next(error))
  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
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
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = notesRouter
