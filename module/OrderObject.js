import { Queue } from './CoffeeQueue'
import { LoggingModul } from './Logging'
import { CoffeeDuration } from '../service/StaticData'

// Set Counter to 0
let counter = 0

class CoffeeOrder {
  constructor (item) {
    // this.httpreq = item.httpreq
    this.counter = counter++
    this.CreatetAt = new Date()
    this.UpdatetAt = new Date()
    this.productID = item.productID
    this.deliveryDate = item.deliveryDate
    this.userID = item.userID
    this.uuid = this.GenerateUUID()
    this.duration = CoffeeDuration[item.productID]

    this.inQueue = true
    this.inQueueTime = new Date()
    this.waitlist = false
    this.waitlistTime = null
    this.delivered = false
    this.deliveredTime = null

    Queue.add(this)
    LoggingModul.add(this)
  }

  // setzt Order auf Waitlist
  AddToWaitlist () {
    this.inQueue = false
    this.waitlist = true
    this.waitlistTime = new Date()
  }

  // setzt Order auf Delivered
  Delivered () {
    this.delivered = true
    this.deliveredTime = new Date()
  }

  // Updatet das OrderObject
  update (item) {
    this.UpdatetAt = new Date()

    // Updatet das OrderObject sodass es wieder in der Queue landet
    this.inQueue = true
    this.waitlist = false
    if (item.productID) {
      this.productID = item.productID
    }
    if (item.deliveryDate) {
      this.deliveryDate = item.deliveryDate
    }
    if (item.userID) {
      this.userID = item.userID
    }
  }

  // UUID generator
  GenerateUUID () {
    const Uid =
      Math.random().toString(36).substring(2, 7) + '-' +
      Math.random().toString(36).substring(2, 7) + '-' +
      Math.random().toString(36).substring(2, 7) + '-' +
      Math.random().toString(36).substring(2, 7)
    return Uid
  }
}
export default CoffeeOrder
