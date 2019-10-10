/*
test index.js
*/
const test = require('assert')
const {validate} = require('./')

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {

  it('can validate a user object', (done) => {
    const testUser = {
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

    validate(testUser, 'user')
      .then(value => {
        console.log('validated')
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('can validate a ticket object', (done) => {
    const testTicket = {
      codiceTreno: "RV2812",
      from: "Verona",
      to: "Bolzano",
      dataPartenza:12-09-2019-12-00-00,
      dataArrivo: 12-09-2019-15-00-00,
      seat: 45,
      classe: 1,
      orderId: '34jh1231ll'
    }

    validate(testTicket, 'ticket')
      .then(value => {
        console.log('validated')
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
