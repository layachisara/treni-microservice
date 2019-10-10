'use strict'
const repository = (container) => {
  const sendEmail = (payload) => {
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
        from: '"Do Not Reply, treni Company" <no-replay@treni.com>',
        to: `${payload.user.email}`,
        subject: `Tickects for treno ${payload.treno.codice}`,
        html: `
            <h1>Tickest for ${payload.treno.codice}</h1>
            <p>: ${payload.treno.}</p>
            <p>Seats: ${payload.treno.seats}</p>

            <p>description: ${payload.description}</p>

            <p>Total: ${payload.totalAmount}</p>
            <p>Total: ${payload.orderId}</p>
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

  const sendSMS = (payload) => {
    // TODO
  }

  return Object.create({
    sendSMS,
    sendEmail
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error('dependencies not supplied!'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, {connect})
