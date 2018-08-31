import { Queue } from './CoffeeQueue'

class Logging {
  constructor (item) {
    this.elements = []
  }
  add (order) {
    this.elements.push(order)
  }

  QueueLength () {
    const QueueLength = Queue.elements.length
    const Waitlist = Queue.GenerateWaitlist().length
    return { inQueue: QueueLength, inWaitlist: Waitlist }
  }

  WorkloadWaitlistecon () {
    const Waitlist = Queue.GenerateWaitlist()
    if (Waitlist.length > 0) {
      return Waitlist.map(item => item.duration).reduce((a, b) => a + b)
    } else {
      return 0
    }
  }

  EstimatedDeliveryTime () {
    const x = this.elements.map(item => {
      if (item.waitlistTime !== null && item.deliveredTime !== null) {
        return (item.deliveredTime - item.waitlistTime) / 1000 + item.duration
      }
    })
      // Filter alle raus die noch ungeliefert sind
      .filter(item => item !== undefined)

    // return 0 wenn noch keine Kaffeedaten vorhanden sind
    if (x.length === 0) {
      return 0
    } else {
      // errechnet den Durschnitt
      const y = x.reduce((a, b) => a + b)
      return y / x.length
    }
  }
}

export const LoggingModul = new Logging()
