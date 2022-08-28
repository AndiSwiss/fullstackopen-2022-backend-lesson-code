/* eslint-disable no-console */
const colors = require('colors/safe')

// Colored output (blue)
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(colors.blue(['INFO:', ...params].join(' ')))
  }
}

// Colored output (red)
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(colors.bgRed(['ERROR:', ...params].join(' ')))
  }
}

module.exports = { info, error }
