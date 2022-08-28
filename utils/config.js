require('dotenv').config()

// This whole thing like singleton (I tested it with a time-stamp)
const PORT = process.env.PORT
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL

// from https://cloud.mongodb.com => Button 'Connect' => 'Connect your application'
// But before the options add your appName, e.g. (without admin/pw) add the 'noteApp' in between:
// MONGODB_URI=mongodb+srv://****:*********@cluster0.swbor.mongodb.net/noteApp?retryWrites=true&w=majority
if (!process.env.MONGODB_URI) throw 'MONGODB_URI is missing in .env!'
if (!process.env.TEST_MONGODB_URI) throw 'MONGODB_URI is missing in .env!'

// Build the URL
const MONGODB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const removePasswordFromMongoDBString = (str) => {
  // Explanation:
  // 1st group: Anything except ':', then '://', then anything except ':', then ':'
  // 2nd group: Actual pw
  // 3rd group: '@', then anything
  const match = str.match(/([^:]*:\/\/[^:]*:)([^@]*)(@.*)/)
  if (match && match.length > 3) return match[1] + '*****' + match[3]
  throw 'Illegal format for MongoDB URL!'
}

const MONGODB_URL_NO_PW = removePasswordFromMongoDBString(MONGODB_URL)

module.exports = { PORT, LOCAL_HOST_URL, MONGODB_URL, MONGODB_URL_NO_PW }
