import { Queue } from './CoffeeQueue'
import { MongoConnection } from '../service/MongoDB'

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
        resolve(Waitlist.map(item => item.duration).reduce((a, b) => a + b))
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
              return (item.deliveredTime - item.waitlistTime) / 1000 + item.duration
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
}

export const LoggingModul = new Logging()
