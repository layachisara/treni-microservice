/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const should = require('should')
const request = require('supertest')
const server = require('../server/server')
const models = require('../models')
const services = require('../services')

describe('Booking API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  let testRepo = {
    makeBooking (user, booking) {
      return Promise.resolve('booking made successfully')
    },
    generateTicket (paid, booking) {
      const testTicket = {
        codiceTreno: booking.codiceTreno,
        from: booking.from,
        to: booking.to,
        dataArrivo: booking.dataArrivo,
        dataPartenza: booking.dataPartenza,
        seats: booking.seats,
        classe: booking.classe,
        orderId: 123
      }
      return Promise.resolve(testTicket)
    },
    getOrderById (orderId) {
      return Promise.resolve('orderId: ' + orderId)
    }
  }

  beforeEach(() => {
    const container = createContainer()

    container.register({
      validate: asValue(models.validate),
      booking: asValue(models.booking),
      user: asValue(models.booking),
      ticket: asValue(models.booking),
      serverSettings: asValue(serverSettings),
      paymentService: asValue(services.paymentService),
      notificationService: asValue(services.notificationService),
      repo: asValue(testRepo)
    })

    return server.start(container)
      .then(serv => {
        app = serv
      })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can make a booking and return the ticket(s)', (done) => {
    const now = new Date()
    now.setDate(now.getDate() + 1)

    const user = {
      name: 'sara',
      lastName: 'layachi',
      email: 'layachisara@nupp.com',
      creditCard: {
        number: '1111222233334444',
        cvc: '123',
        exp_month: '07',
        exp_year: '2029'
      },
      membership: '7777888899990000'
    }

    request(app)
      .post('/booking')
      .send({user, booking})
      .expect((res) => {
        res.body.should.containEql({
          codiceTreno: booking.codiceTreno,
          from: booking.from,
          to: booking.to,
          dataArrivo: booking.dataArrivo,
          dataPartenza: booking.dataPartenza,
          seats: booking.seats,
          classe: booking.classe,
          orderId: 123
        })
      })
      .expect(200, done)
  })
})
