/*
1. Creating the routes for our API
2. Calling our repo functions depending on the route listened using
   the “coding for an interface not to an implementation” approach.
*/
'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options
  // get all treni
  app.get('/treni', (req, res, next) => {
    repo.getAllTreni().then(treni => {
      res.status(status.OK).json(treni)
    }).catch(next)
  })
  // get treno by Id
  app.get('/treni/:id', (req, res, next) => {
    repo.getTrenoById(req.params.id).then(treno => {
      res.status(status.OK).json(treno)
    }).catch(next)
  })
}
