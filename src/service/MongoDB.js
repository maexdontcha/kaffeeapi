import { MongoStatic } from './StaticData'
const MongoClient = require('mongodb').MongoClient

export const MongoConnection = () => {
  return new Promise((resolve, reject) => {
    // { user: 'root', pass: 'root' },
    MongoClient.connect(MongoStatic.MongoURL, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err
      const db = client.db(MongoStatic.DBName)
      const collection = db.collection(MongoStatic.Collection)
      resolve(collection)
    })
  })
}
