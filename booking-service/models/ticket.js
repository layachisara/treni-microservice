// validate that the object is complete

const ticketSchema = (joi) => ({
  codiceTreno: joi.string(),
  from: joi.string(),
  to: joi.string(),
  dataArrivo: joi.date(),
  dataPartenza: joi.date(),
  classe: joi.string(),
  seats: joi.array().items(joi.string()).single(),
  orderId: joi.string().alphanum()
})

module.exports = ticketSchema
