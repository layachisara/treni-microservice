
/*
  Here is where we do our query’s to the database.
  Abstracting the type of database we are connecting to.
*/

'use strict'

// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.
const repository = (db) => {
  const collection = db.collection('treni')

  const getAllTreni = () => {
    return new Promise((resolve, reject) => {
      const treni = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addTreno = (treno) => {
        treni.push(treno)
      }
      const sendTreni = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all treni, err:' + err))
        }
        resolve(treni.slice())
      }
      cursor.forEach(addTreno, sendTreni)
    })
  }

  const getTreno = () => {
    return new Promise((resolve, reject) => {
      const treni = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      const cursor = collection.find(query)
      const addTreno = (treno) => {
        treni.push(treno)
      }
      const sendTreni = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all treni, err:' + err))
        }
        resolve(treni)
      }
      cursor.forEach(addTreno, sendTreni)
    })
  }

  const getTrenoById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendTreno = (err, treno) => {
        if (err) {
          reject(new Error(`An error occured fetching a treno with id: ${id}, err: ${err}`))
        }
        resolve(treno)
      }
      // fetch a train by id -- mongodb syntax
      collection.findOne({id: id}, projection, sendTreno)
    })
  }

  const disconnect = () => {
    //close the database connection
    db.close()
  }

  return Object.create({
    getAllTreni,
    getTrenoById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}
//exports a connected repo
module.exports = Object.assign({}, {connect})
