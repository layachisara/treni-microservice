/*
test treni.js
(stubbing the dependencies for thE API, and for the server we are verifying
that we need to provided a server port and a repository object.)
*/
const request = require('supertest')
const server = require('../server/server')

describe('Trenos API', () => {
  let app = null
  let testTreni = [{
    "codice": "RV2812",
    "from": "Verona",
    "to": "Bolzano",
    "dataPartenza":12-09-2019-12-00-00,
    "dataArrivo": 12-09-2019-15-00-00
  }, {
    "codice": "RG3490",
    "from": "Verona",
    "to": "Bolzano",
    "dataPartenza":12-09-2019-12-00-00,
    "dataArrivo": 12-09-2019-15-00-00
  }, {
    "codice": "RV7890",
    "from": "Verona",
    "to": "Bolzano",
    "dataPartenza":12-09-2019-12-00-00,
    "dataArrivo": 12-09-2019-15-00-00
  }]

  let testRepo = {
    getAllTrenos () {
      return Promise.resolve(testTreni)
    },
    getTrenoById (id) {
      return Promise.resolve(testTreni.find(treno => treno.id === id))
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return all treni', (done) => {
    request(app)
      .get('/treni')
      .expect((res) => {
        res.body.should.containEql({
          "codice": "RV2812",
          "from": "Verona",
          "to": "Bolzano",
          "dataPartenza":12-09-2019-12-00-00,
          "dataArrivo": 12-09-2019-15-00-00
        })
      })
      .expect(200, done)
  })

  it('returns 200 for an known treno', (done) => {
    request(app)
      .get('/treni/1')
      .expect((res) => {
        res.body.should.containEql({
          "codice": "RV2812",
          "from": "Verona",
          "to": "Bolzano",
          "dataPartenza":12-09-2019-12-00-00,
          "dataArrivo": 12-09-2019-15-00-00
        })
      })
      .expect(200, done)
  })
})
