import { MongoConnection } from './MongoDB'

// Zeiten wie lange die jeweiligen Kaffen brauchen
export const CoffeeDuration = [
  { 'id': 1, 'duration': 30, 'name': 'Espresso' },
  { 'id': 2, 'duration': 50, 'name': 'Cafe Creme' },
  { 'id': 3, 'duration': 120, 'name': 'Milch-Choc ' },
  { 'id': 4, 'duration': 120, 'name': 'Chociatto' },
  { 'id': 5, 'duration': 120, 'name': 'Cappuccino' },
  { 'id': 6, 'duration': 120, 'name': 'Latte Macchiato' },
  { 'id': 7, 'duration': 120, 'name': 'Milchkaffee' },
  { 'id': 8, 'duration': 120, 'name': 'Milchschaum' },
  { 'id': 9, 'duration': 120, 'name': 'Espresso doppelt' },
  { 'id': 10, 'duration': 120, 'name': 'Cafe Creme doppelt' },
  { 'id': 11, 'duration': 120, 'name': 'Espresso Macchiato' },
  { 'id': 12, 'duration': 120, 'name': 'Espresso Macchiato doppelt' },
  { 'id': 13, 'duration': 120, 'name': 'Cappuccino doppelt' },
  { 'id': 14, 'duration': 120, 'name': 'Latte Macchiato doppelt' },
  { 'id': 15, 'duration': 120, 'name': 'Milchkaffee doppelt' }
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
  DBName: 'CoffeeMachine',
  Collection: 'order1'
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

// generate Time slot
export const GenerateTimeslots = () => {
  const x = 8
  const timeslot = 24 / x
  const array = []
  for (let i = 0; i <= x - 1; i++) {
    let s = i * timeslot
    let e = s + timeslot
    array.push({ start: s, end: e })
  }
  return array
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
  console.log('|      "-------"        Created by Philipp and Max            |')
  console.log('|                                                             |')
  console.log('|_____________________________________________________________|')
}
