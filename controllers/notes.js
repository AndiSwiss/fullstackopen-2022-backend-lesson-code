const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

/**
 * GET all notes
 */
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

/**
 * GET individual note
 */
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) response.json(note)
  else response.status(404).end()
})

/**
 * POST a new note
 */
notesRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  // Not in sample solution code, but otherwise, the app crashes if no userId is defined or the user is not in the DB
  if (!user) return response.status(400).json({
    error: 'userId was not defined - or not find in the user DB'
  })

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)
})

/**
 * PUT: Change a note
 */
notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body
  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedNote)
})

/**
 * DELETE a note
 */
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter
