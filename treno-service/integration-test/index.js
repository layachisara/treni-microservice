/* eslint-env mocha */
const supertest = require('supertest')

describe('treni-service', () => {
  const api = supertest('http://192.168.99.100:3000')
  it('returns a 200 for a known treni', (done) => {
    api.get('/treni')
      .expect(200, done)
  })
})
