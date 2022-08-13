require('dotenv').config()

const PORT = process.env.PORT
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL

module.exports = { PORT, LOCAL_HOST_URL }
