const app = require('./app') // the actual Express application
const http = require('http')
const { PORT, LOCAL_HOST_URL } = require('./utils/config')
const { info } = require('./utils/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
  if (LOCAL_HOST_URL) info(`Server running at ${LOCAL_HOST_URL}:${PORT}`)
  else info(`Server running at Port=${PORT}`)
})
