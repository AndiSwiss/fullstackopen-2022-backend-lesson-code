const { MONGODB_URL, MONGODB_URL_NO_PW } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const { info } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URL)
  .then(() => info(`connected to MongoDB: ${MONGODB_URL_NO_PW}`))
  .catch(error => {
    info(`error connecting to MongoDB: ${MONGODB_URL_NO_PW}`)
    info(`error-message: ${error}`)
  })

app.use(cors())

/**
 * Serve the production-build of the frontend in folder /build
 * Was built from repo 'fullstackopen-2022', folder part3/lesson-code-frontend
 */
app.use(express.static('build'))

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)  // Use all the routes for the note api
app.use('/api/users', usersRouter)  // Use all the routes for the users api
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
