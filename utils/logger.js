/* eslint-disable no-console */
const colors = require('colors/safe')

// colored output (blue)
const info = (...params) => console.log(colors.blue(['INFO:', ...params].join(' ')))

// colored output (red)
const error = (...params) => console.error(colors.bgRed(['ERROR:', ...params].join(' ')))

module.exports = { info, error }
