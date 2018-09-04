import { Queue } from './CoffeeQueue'
import { MongoConnection } from '../service/MongoDB'
import { CoffeeDuration } from '../service/StaticData'

class Logging {
  // constructor (item) {
  //   this.elements = []
  // }
  // add (order) {
  //   this.elements.push(order)
  // }

  QueueLength () {
    return new Promise((resolve, reject) => {
      const QueueLength = Queue.elements.length
      const Waitlist = Queue.GenerateWaitlist().length
      resolve({ inQueue: QueueLength, inWaitlist: Waitlist })
    })
  }

  WorkloadWaitlist () {
    return new Promise((resolve, reject) => {
      const Waitlist = Queue.GenerateWaitlist()

      if (Waitlist.length > 0) {
        resolve(Waitlist.map(item => {
          return CoffeeDuration.find(Duration => Duration.id === item.productID).duration
        }).reduce((a, b) => a + b))
      } else {
        resolve(0)
      }
    })
  }

  EstimatedDeliveryTime () {
    return new Promise(async (resolve, reject) => {
      MongoConnection().then((connection) => {
        connection.find().toArray((err, result) => {
          if (err) throw err
          const x = result.map(item => {
            if (item.waitlistTime !== null && item.deliveredTime !== null) {
              const duration = CoffeeDuration.find(Duration => Duration.id === item.productID).duration
              return (item.deliveredTime - item.waitlistTime) / 1000 + duration
            }
          })// Filter alle raus die noch ungeliefert sind
            .filter(item => item !== undefined)
          // return 0 wenn noch keine Kaffeedaten vorhanden sind
          if (x.length === 0) {
            resolve(x)
          } else {
            // errechnet den Durschnitt
            const y = x.reduce((a, b) => a + b)
            resolve(y / x.length)
          }
        })
      })
    })
  }

  AllOrdersQuantity () {
    return new Promise((resolve, reject) => {
      MongoConnection().then((connection) => {
        const Quantity = []
        const QueryPromises = []
        CoffeeDuration.map((CoffeeType) => {
          const query = connection.find({ productID: CoffeeType.id }).count().then((result) => {
            Quantity.push({ id: CoffeeType.id, CoffeeType: CoffeeType.name, Quantity: result })
          })
          QueryPromises.push(query)
        })
        Promise.all(QueryPromises).then(() => {
          resolve(Quantity)
        })
      })
    })
  }
}

export const LoggingModul = new Logging()
