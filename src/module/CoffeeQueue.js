class CoffeeQueue {
  constructor (item) {
    this.elements = []
  }
  add (order) {
    this.elements.push(order)
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
    const QueueElement = this.elements.find(QueueElement => new Date(QueueElement.deliveryDate) < date && QueueElement.inQueue === true)
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
}

export const Queue = new CoffeeQueue()
