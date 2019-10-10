
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('API Gateway Service', () => {
  it('returns a 200 for a known treni through api-gateway', (done) => {
    const url = 'https://192.168.99.100:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    api.get('/treni/id:'')
      .expect(200, done)
  })

  it('returns schedules for a treno through api-gateway', (done) => {
    const url = 'https://192.168.99.101:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    api.get('/treni/588ababf2d029a6d15d0b5bf/1')
      .expect(200, done)
  })

  it('can make a booking through api-gateway', function (done) {
    this.timeout(5000)
    const url = 'https://192.168.99.102:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    const now = new Date()
    now.setDate(now.getDate() + 1)
    const user = {
      name: 'sara',
      lastName: 'layachi',
      email: 'layachisara@nupp.com',
      creditCard: {
        number: '1111222233334444',
        cvc: '123',
        exp_month: '12',
        exp_year: '2029'
      },
      membership: '7777888899990000'
    }

    const tickect = {
      codiceTreno: "RV2812",
      from: "Verona",
      to: "Bolzano",
      dataPartenza:12-09-2019-12-00-00,
      dataArrivo: 12-09-2019-15-00-00,
      seat: 45,
      classe: 1,
      amount: 71,
      orderId: '34jh1231ll'
    }

    api.post('/booking')
      .send({user, tickect})
      .expect(200, done)
  })

  it('can make a paymentOrder through api-gateway', function (done) {
    this.timeout(3000)
    const url = 'https://192.168.99.100:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    const testPayment = {
      userName: 'sara layachi',
      currency: 'mxn',
      number: '1111222233334444',
      cvc: '123',
      exp_month: '12',
      exp_year: '2029',
      amount: 71,
      description: `
        Tickect(s) for treno "RV2812",
        with seat(s) 45, classe 1
        at time 12/09/2019 12:00 from: Verona to: Bolzano`
    }
    api.post('/payment/makePurchase')
      .send({paymentOrder: testPayment})
      .expect(200, done)
  })

  it('can send a notification through api-gateway', function (done) {
    this.timeout(3000)
    const url = 'https://192.168.99.101:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)
    const payload ={
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
    api.post('/notification/sendEmail')
      .send({payload})
      .expect(200, done)
  })
})
