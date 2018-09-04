import { MongoConnection } from '../service/MongoDB'
import CoffeeObjekt from '../module/OrderObject'
import { LastCounter } from '../service/StaticData'

class CoffeeQueue {
  constructor (item) {
    this.SetCounter()
    this.elements = []
  }
  add (order) {
    this.elements.push(order)
  }

  SetCounter () {
    LastCounter().then(item => {
      this.counter = item + 1
    })
  }

  // Löscht eine Bestellung aus der Queue
  deleteBeverage (uuid, cb) {
    const index = this.elements.findIndex(QueueElement => QueueElement.uuid === uuid)
    if (index !== -1) {
      this.elements.splice(index, 1)
      cb(null, true)
    } else {
      cb(new Error('nothing to delete here'))
    }
  }

  // Liefert das OrderObject aus der Queue als Callback zurück
  OrderByUUid (uuid, cb) {
    const QueueElement = this.elements.find(QueueElement => QueueElement.uuid === uuid)
    if (!QueueElement) {
      cb(new Error('nothing to update here'))
    } else {
      cb(null, QueueElement)
    }
  }

  // Sucht alle Bestellungen die Ausgeführt werden müssen und lieferte die OrderObjecte als Callback zurück
  ToBeExecuted (cb) {
    const date = new Date()
    // const QueueElement = this.elements.find(QueueElement => new Date(QueueElement.deliveryDate) < date && QueueElement.inQueue === true)
    const QueueElement = this.elements.find(QueueElement => new Date(QueueElement.deliveryDate) < date && QueueElement.waitlist === false)
    if (QueueElement) {
      cb(QueueElement)
    }
  }

  // Erstellt eine Liste mit allen OrderObjecten die ans ACL Interface geschickt werden müssen
  GenerateWaitlist () {
    const currenList = Queue.elements.filter(QueueElement => QueueElement.waitlist === true)
    return currenList.sort((a, b) => a.counter - b.counter)
  }

  // liefert die Zeit bis zur Ausführung an der Kaffeemaschiene
  // Ergebnis als INT value
  getEstimatedTime (uuid) {
    const waitlist = this.GenerateWaitlist()
    const index = waitlist.findIndex(QueueElement => QueueElement.uuid === uuid)
    let result = false
    for (let i = 0; i <= index; i++) {
      result += waitlist[i].duration
    }
    return result
  }

  // Load old Orders into Queue
  LoadOrders () {
    MongoConnection().then((connection) => {
      const query = { delivered: false }
      connection.find(query).toArray((err, result) => {
        if (err) throw err
        result.map((order) => {
          const object = new CoffeeObjekt({
            'productID': order.productID,
            'deliveryDate': new Date(order.deliveryDate),
            'userID': order.userID,
            'httpreq': order.req
          })
          object.httpreq = order.httpreq
          object.counter = order.counter
          object.duration = order.duration
          object.uuid = order.uuid
          object.duration = order.duration
          object.inQueue = order.inQueue
          object.inQueueTime = new Date(order.inQueueTime)
          object.waitlist = order.waitlist
          object.waitlistTime = new Date(order.waitlistTime)
          object.delivered = order.delivered
          object.deliveredTime = false
        })
      })
    })
  }
}

export const Queue = new CoffeeQueue()
