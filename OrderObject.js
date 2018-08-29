//
// export const name = () => { console.log(12) }
//
// export const name2 = () => { console.log(12) }
'use strict'
import { Queue } from './CoffeeQueue'

class CoffeeOrder {
  constructor (item) {
    this.CreatetAt = new Date()
    this.UpdatetAt = new Date()
    this.productID = item.productID
    this.deliveryDate = item.deliveryDate
    this.userID = item.userID
    this.uuid = this.GenerateUUID()
    this.inQueue = true
    this.waitlist = false
    Queue.add(this)
  }
  update (item) {
    this.UpdatetAt = new Date()
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

// export const CoffeeObjekt = new CoffeeOrder()
