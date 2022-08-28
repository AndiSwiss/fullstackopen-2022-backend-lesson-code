/**
 * From
 * https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#testing-node-applications
 */

const reverse = str => str.split('').reverse().join('')

const reducer = (sum, item) => sum + item

const average = array => array.length === 0
  ? 0
  : array.reduce(reducer, 0) / array.length

module.exports = { reverse, average }
