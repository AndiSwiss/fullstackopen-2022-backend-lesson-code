const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const { info } = require('./utils/logger')
const mongoose = require('mongoose')


// TODO: move to ./utils/config.js (as singleton?)
// from https://cloud.mongodb.com => Button 'Connect' => 'Connect your application'
const mongoDbCluster = process.env.MONGODB_CLUSTER
const mongoDbUser = process.env.MONGODB_USER
const mongoDbPw = process.env.MONGODB_PW
const url = `mongodb+srv://${mongoDbUser}:${mongoDbPw}@${mongoDbCluster}/?retryWrites=true&w=majority`
const urlNoPassword = `mongodb+srv://${mongoDbUser}:**********@${mongoDbCluster}/?retryWrites=true&w=majority`
if (!url) throw 'MongoDB-URL is missing!'

mongoose.connect(url)
  .then(() => info(`connected to MongoDB: ${urlNoPassword}`))
  .catch(error => {
    info(`error connecting to MongoDB: ${urlNoPassword}`)
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

// use all the routes for the note api:
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
