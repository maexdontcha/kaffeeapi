import { MongoConnection } from './MongoDB'

// Zeiten wie lange die jeweiligen Kaffen brauchen
export const CoffeeDuration = [
  { 'id': 1, 'duration': 30, 'name': 'espresso' },
  { 'id': 2, 'duration': 10, 'name': 'Caffee Crema' },
  { 'id': 3, 'duration': 20, 'name': 'andere' },
  { 'id': 4, 'duration': 25, 'name': 'andere' },
  { 'id': 5, 'duration': 25, 'name': 'andere' },
  { 'id': 6, 'duration': 25, 'name': 'andere' },
  { 'id': 7, 'duration': 25, 'name': 'andere' },
  { 'id': 8, 'duration': 25, 'name': 'andere' },
  { 'id': 9, 'duration': 25, 'name': 'andere' },
  { 'id': 10, 'duration': 25, 'name': 'andere' },
  { 'id': 11, 'duration': 25, 'name': 'Dusch mich' }
]

// Maschienen Stati
export const MachineStates = {
  run: 'isRunning',
  ready: 'ready',
  error: 'error'
}

// MongoDB
export const MongoStatic = {
  MongoURL: 'mongodb://localhost:27017',
  // MongoURL: 'mongodb://root:root@mongodb/admin',
  DBName: 'myproject',
  Collection: 'test15'
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
