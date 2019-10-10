/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const should = require('should')
const request = require('supertest')
const server = require('../server/server')
const models = require('../models')
const {smtpSettings} = require('../config/config')

describe('Booking API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  const container = createContainer()

  container.register({
    validate: asValue(models.validate),
    serverSettings: asValue(serverSettings),
    smtpSettings: asValue(smtpSettings),
    nodemailer: asValue(nodemailer),
    smtpTransport: asValue(smtpTransport)
  })

  let _testRepo = {
    sendEmail ({container}, payload) {
      return new Promise((resolve, reject) => {
        const {smtpSettings, smtpTransport, nodemailer} = container.cradle

        const transporter = nodemailer.createTransport(
          smtpTransport({
            service: smtpSettings.service,
            auth: {
              user: smtpSettings.user,
              pass: smtpSettings.pass
            }
          }))

        const mailOptions = {
          from: '"Do Not Reply, treni Company 👥" <no-replay@treni.com>',
          to: `${payload.user.email}`,
          subject: `Tickects for treno ${payload.treno.title}`,
          html: `
              <h1>Tickest for ${payload.treno.codice}</h1>

              <h4>: <span>${payload.treno.}</span> </h4>
              <h4>Seat(s): <span>${payload.treno.seats}</span> </h4>

              <h4>description: <span>${payload.description}</span> </h4>

              <h4>Total: <span>${payload.totalAmount}</span> </h4>
              <h4>number of order: <span>${payload.orderId}</span> </h4>

            `
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(new Error('An error occured sending an email, err:' + err))
          }
          transporter.close()
          resolve(info)
        })
      })
    }
  }

  const testRepo = {}

  testRepo.sendEmail = _testRepo.sendEmail.bind(null, {container})

  container.registerValue({repo: testRepo})

  beforeEach(() => {
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
    const payload = {
      treno: {
        codiceTreno: "RV2812"
      },
      orderId: '1aa90cx',
      description: 'some description',
      user: {
        name: 'sara layachi',
        email: 'layachisara@nupp.com'
      }
    }

    request(app)
      .post('/notification/sendEmail')
      .send({payload})
      .expect((res) => {
        should.ok(res.body)
      })
      .expect(200, done)
  })
})
