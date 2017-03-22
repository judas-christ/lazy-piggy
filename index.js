const connect = require('connect')
const http = require('http')
const compression = require('compression')
const basicAuth = require('basic-auth')
const serveStatic = require('serve-static')

const defaultOptions = {
  auth: undefined,
  host: 'localhost',
  port: process.env.PORT || 3000,
  root: 'public'
}
const defaultAuth = {
  users: undefined,
  realm: 'Lazy Piggy'
}

function lazyPiggy (options) {
  const opts = Object.assign({}, defaultOptions, options)
  const app = connect()

  // gzip/deflate outgoing responses
  app.use(compression())

  // basic auth
  const auth = Object.assign({}, defaultAuth, opts.auth)
  if (auth.realm && auth.users) {
    app.use((req, res, next) => {
      const user = basicAuth(req)
      if (user === undefined || !(user.name in auth.users && user.pass === auth.users[user.name])) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', `Basic realm="${auth.realm}"`)
        res.end('Unauthorized')
      } else {
        next()
      }
    })
  }

  // serve static files
  app.use(serveStatic(opts.root))

  // create node.js http server and listen on port
  const server = http.createServer(app).listen(opts.port, opts.host)
  console.log(`Serving \u001b[35m${opts.root}\u001b[39m at \u001b[32mhttp://${opts.host}:${opts.port}\u001b[39m`)

  process.on('SIGINT', stopServer(server, true))
  process.on('exit', stopServer(server, true))

  return {
    close: stopServer(server, false)
  }
}

function stopServer (server, exit) {
  return () => {
    if (server.listening) {
      server.close()
      console.log('Server stopped')
    }
    if (exit) {
      process.exit(0)
    }
  }
}

module.exports = lazyPiggy
