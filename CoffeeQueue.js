class CoffeeQueue {
  constructor (item) {
    this.elements = []
  }
  add (order) {
    this.elements.push(order)
  }

  deleteBeverage (uuid, cb) {
    const index = this.elements.findIndex(QueueElement => QueueElement.uuid === uuid)
    if (index !== -1) {
      this.elements.splice(index, 1)
      cb(null, true)
    } else {
      cb(new Error('nothing to delete here'))
    }
  }

  OrderByUUid (uuid, cb) {
    const QueueElement = this.elements.find(QueueElement => QueueElement.uuid === uuid)
    if (!QueueElement) {
      cb(new Error('nothing to update here'))
    } else {
      cb(null, QueueElement)
    }
  }

  ToBeExecuted (cb) {
    const date = new Date()
    const QueueElement = this.elements.find(QueueElement => new Date(QueueElement.deliveryDate) < date && QueueElement.inQueue === true)
    if (QueueElement) {
      cb(QueueElement)
    }
  }
}

export const Queue = new CoffeeQueue()
