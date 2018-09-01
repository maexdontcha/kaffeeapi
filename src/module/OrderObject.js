import { Queue } from './CoffeeQueue'
import { LoggingModul } from './Logging'
import { CoffeeDuration } from '../service/StaticData'
import { InsertIntoMongoDB, UpdateMongoObject } from '../service/MongoDB'
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
    this.GenerateMongoDB()
  }

  GenerateMongoDB () {
    InsertIntoMongoDB(this)
  }

  Save () {
    const id = { uuid: this.uuid }
    const myobj = { $set: this }
    UpdateMongoObject(id, myobj)
  }

  // setzt Order auf Waitlist
  AddToWaitlist () {
    this.inQueue = false
    this.waitlist = true
    this.waitlistTime = new Date()
    this.Save()
  }

  // setzt Order auf Delivered
  DeliveredToCustomer () {
    this.delivered = true
    this.waitlist = false
    this.deliveredTime = new Date()
    this.Save()
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
    this.Save()
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
