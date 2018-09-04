import { MongoConnection } from './MongoDB'

// Zeiten wie lange die jeweiligen Kaffen brauchen
export const CoffeeDuration = {
  1: 45, // Espresso
  2: 55, // CaffeeCrema
  3: 44, // CaffeeCrema
  4: 30 // CaffeeCrema
}

// Maschienen Stati
export const MachineStates = {
  run: 'isRunning',
  ready: 'ready',
  error: 'error'
}

// MongoDB
export const MongoStatic = {
  // MongoURL: 'mongodb://root:root@localhost:27017/admin',
  MongoURL: 'mongodb://root:root@mongodb/admin',
  DBName: 'myproject',
  Collection: 'test12'
}

// LastCounter
export const LastCounter = () => {
  return new Promise((resolve, reject) => {
    MongoConnection().then((connection) => {
      connection.find().sort({ counter: -1 }).limit(1).toArray((err, result) => {
        if (err) throw err
        if (result[0] !== undefined) {
          resolve(result[0].counter)
        } else {
          resolve(0)
        }
      })
    })
  })
}

export const entryScreen = () => {
  console.log(' ______________________________________________________________')
  console.log('|                                                             |')
  console.log('|        )  (           API is running on                     |')
  console.log('|       (   ) )         http://localhost:9000                 |')
  console.log('|        ) ( (                                                |')
  console.log('|      _______)_        Deamon is running                     |')
  console.log('|   .-"---------|       Check Queue in interval 1000ms        |')
  console.log('|  ( C|/\\/\\/\\/\\/|       tryOrderBeverage in interval 3000ms   |')
  console.log('|   "-./\\/\\/\\/\\/|                                             |')
  console.log('|     "_________"                                             |')
  console.log('|      "-------"        Createt by Philipp and Max            |')
  console.log('|                                                             |')
  console.log('|_____________________________________________________________|')
}
