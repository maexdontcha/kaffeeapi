import { MongoStatic } from './StaticData'
const MongoClient = require('mongodb').MongoClient

export const MongoConnection = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MongoStatic.MongoURL, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err
      const db = client.db(MongoStatic.DBName)
      const collection = db.collection(MongoStatic.Collection)
      resolve(collection)
    })
  })
}

// export const InsertIntoMongoDB = (myobj) => {
//   MongoClient.connect(MongoStatic.MongoURL, { useNewUrlParser: true }, (err, client) => {
//     if (err) throw err
//     const db = client.db(MongoStatic.DBName)
//     const collection = db.collection(MongoStatic.Collection)
//     collection.insertOne(myobj, (err, res) => {
//       if (err) throw err
//     })
//   })
// }
//
// export const UpdateMongoObject = (id, myobj) => {
//   MongoClient.connect(MongoStatic.MongoURL, { useNewUrlParser: true }, (err, client) => {
//     if (err) throw err
//     const db = client.db(MongoStatic.DBName)
//     const collection = db.collection(MongoStatic.Collection)
//
//     collection.updateOne(id, myobj, (err, res) => {
//       if (err) throw err
//       // console.log(res)
//     })
//   })
// }
//
// export const FindMongoObject = () => {
//   return new Promise((resolve, reject) => {
//     MongoClient.connect(MongoStatic.MongoURL, { useNewUrlParser: true }, (err, client) => {
//       if (err) throw err
//       const db = client.db(MongoStatic.DBName)
//       const collection = db.collection(MongoStatic.Collection)
//
//       collection.find().toArray((err, result) => {
//         if (err) throw err
//         resolve(result)
//       })
//     })
//   })
// }
