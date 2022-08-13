const logger = require('./logger')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


/**
 * Answer for all other (unknown) endpoints)
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint!' })
}


/**
 * Error handler middleware
 */
const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })

  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
