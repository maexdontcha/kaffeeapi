import { Queue } from './CoffeeQueue'
import { ApiRequest, Api, Endpoint, Feedback } from '../service/ApiRequest'
import { CoffeeDuration, entryScreen } from '../service/StaticData'

// Service Class, prüft und sendet die Orders an das ACL Interface wenn vorhanden
class Service {
  constructor () {
    this.tryOrderBeverage()
    this.checkQueue()
  }

  // init function
  run () {
    // Render entryScreen
    entryScreen()
  }

  // Prüft ob Bestellungen in der Queue ausgeführt werden sollen
  // und setzt das Attribut Waitlist auf True
  // Der Prüfinterval beträgt 1sek
  checkQueue () {
    setInterval(() => {
      Queue.ToBeExecuted((CoffeeOrder) => {
        CoffeeOrder.AddToWaitlist()
      })
    }, 1000)
  }

  // Versucht die Bestellungen die in der Waitlist
  // sind an das ACL Interface zu senden und aus der Queue zu nehmen
  async tryOrderBeverage () {
    // Holt sich die Liste die Abgearbeitet werden muss
    const currenList = Queue.GenerateWaitlist()
    const CoffeeOrder = currenList[0]
    if (currenList.length !== 0) {
      // Prüft ob die Maschine Daten annehmen kann
      await this.getStatus().then(async () => {
        await this.StartBeverage(CoffeeOrder.productID).then(() => {
          CoffeeOrder.DeliveredToCustomer()
          // Löscht die Order aus der Queue
          const index = Queue.elements.findIndex(QueueElement => QueueElement.uuid === CoffeeOrder.uuid)
          Queue.elements.splice(index, 1)
        }).catch(() => {
          // Ausgabe auf der Console
          // console.log('ACL INTERFACE Down')
        })
      }).catch(() => {})
    }
    // Wartet 3sekunden und fängt von vorne an
    setTimeout(() => this.tryOrderBeverage(), 3000)
  }

  // Frage Status bei der Kaffeemaschiene an ob diese Ready ist
  // Aktuell als Dummyfunktion, abfrage geht über die API
  getStatus () {
    return new Promise(async (resolve, reject) => {
      await ApiRequest(Api.Fake + Endpoint.state)
        .then(body => {
          const respond = JSON.parse(body)
          if (respond.state === 'ready') {
            resolve(true)
          } else {
            setTimeout(() => reject(new Error('not ready')), 3000)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // Versucht die Bestellungen an das ACL Interface zu senden
  StartBeverage (BeverageId) {
    return new Promise(async (resolve, reject) => {
      // Sendet aufgaben Stack an das ACL Interface
      Promise.all([
        ApiRequest(Api.Acl + Endpoint.cmd + Feedback.StartColor),
        ApiRequest(Api.Acl + Endpoint.cmd + Feedback.StartSpeak),
        ApiRequest(Api.Acl + Endpoint.cmd + 'StartBeverage(' + BeverageId + ')')]
      )
        .then(async () => {
          // Setzt den State Dummymäßig auf Running, Duration aus .cfg file
          const CoffeeSelection = CoffeeDuration.find(CoffeeSelection => CoffeeSelection.id === BeverageId)
          await ApiRequest(Api.Fake + Endpoint.changestate + '?duration=' + CoffeeSelection.duration)
          resolve(true)
        })
        .catch((err) => {
          reject(new Error(err))
        })
    })
  }
}

export const DeamonService = new Service()
