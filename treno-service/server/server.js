/*
1.Instantiating a new express app.
2.Verifying if we provide a repository and server port objects.
3.Applying some middleware to our express app:
  morgan for logging,
  helmet for security,
  error handling function.
4.Exporting a start function to be able to start the server
*/
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const api = require('../api/treni')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    api(app, options)

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
