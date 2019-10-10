/* eslint-env mocha */
const supertest = require('supertest')

describe('Notification Service', () => {
  const api = supertest('http://192.168.99.100:3004')
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

  it('can send a notification via email', (done) => {
    api.post('/notification/sendEmail')
      .send({payload})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
