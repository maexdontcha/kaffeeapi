const MongoClient = require('mongodb').MongoClient

const MongoURL = 'mongodb://localhost:27017'
// Database Name
const dbName = 'myproject'
// Collectionname
const coffeeorder = 'test4'

export const InsertIntoMongoDB = (myobj) => {
  MongoClient.connect(MongoURL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    const db = client.db(dbName)
    const collection = db.collection(coffeeorder)
    collection.insertOne(myobj, (err, res) => {
      if (err) throw err
    })
  })
}

export const UpdateMongoObject = (id, myobj) => {
  MongoClient.connect(MongoURL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    const db = client.db(dbName)
    const collection = db.collection(coffeeorder)

    collection.updateOne(id, myobj, (err, res) => {
      if (err) throw err
      // console.log(res)
    })
  })
}

export const FindMongoObject = () => {
  MongoClient.connect(MongoURL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    const db = client.db(dbName)
    const collection = db.collection(coffeeorder)

    collection.find()
  })
}

// db.collection('mammals').find().toArray(function (err, result) {
//   if (err) throw err
//
//   console.log(result)
// })
