/* eslint-env mocha */
const supertest = require('supertest')

describe('Payment Servie', () => {
  const api = supertest('http://192.168.99.100:3003')
  const testPayment = {
    userName: 'sara Layachi',
    currency: 'mxn',
    number: '4242424242424242',
    cvc: '123',
    exp_month: '12',
    exp_year: '2029',
    amount: 71,
    description: `
    Tickect(s) for treno "RV2812",
    with seat(s) 45, classe 1
    at time 12/09/2019 12:00 from: Verona to: Bolzano`
  }

  it('can make a paymentOrder', (done) => {
    api.post('/payment/makePurchase')
      .send({paymentOrder: testPayment})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
