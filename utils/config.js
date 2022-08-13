require('dotenv').config()

// This whole thing like singleton (I tested it with a time-stamp)
const PORT = process.env.PORT
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL

// from https://cloud.mongodb.com => Button 'Connect' => 'Connect your application'
const mongoDbCluster = process.env.MONGODB_CLUSTER
const mongoDbUser = process.env.MONGODB_USER
const mongoDbPw = process.env.MONGODB_PW
if (!mongoDbCluster) throw 'mongoDbCluster is missing in .env!'
if (!mongoDbUser) throw 'mongoDbUser is missing in .env!'
if (!mongoDbPw) throw 'mongoDbPw is missing in .env!'

// Build the URL
const MONGODB_URL = `mongodb+srv://${mongoDbUser}:${mongoDbPw}@${mongoDbCluster}/?retryWrites=true&w=majority`
const MONGODB_URL_NO_PW = `mongodb+srv://${mongoDbUser}:**********@${mongoDbCluster}/?retryWrites=true&w=majority`

module.exports = { PORT, LOCAL_HOST_URL, MONGODB_URL, MONGODB_URL_NO_PW }
