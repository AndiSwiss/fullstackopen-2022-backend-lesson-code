const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const { info } = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  if (config.LOCAL_HOST_URL) info(`Server running at ${config.LOCAL_HOST_URL}:${config.PORT}`)
  else info(`Server running at Port=${config.PORT}`)
})
