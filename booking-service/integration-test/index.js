/* eslint-env mocha */
const supertest = require('supertest')

describe('Booking Service', () => {
  const api = supertest('http://192.168.99.100:3002')
  const now = new Date()
  now.setDate(now.getDate() + 1)
  const user = {
    name: 'sara',
    lastName: 'Layachi',
    email: 'sarao@gmail.com',
    creditCard: {
      number: '4242424242424242',
      cvc: '123',
      exp_month: '12',
      exp_year: '20',
    },
    membership: '7777888899990000'
  }

  const booking = {
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
  it('can make a booking', (done) => {
    api.post('/booking')
      .send({user, booking})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
