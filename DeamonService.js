import { Queue } from './CoffeeQueue'
const request = require('request')

const AclInterface = 'http://localhost:8000'
const fakeapi = 'http://localhost:9000'

const endpoints = {
  order: '/sendCommand?cmd=StartBeverage',
  // state: '/getStatus'
  state: '/fakestatus',
  changestate: '/changestate'
}

class Service {
  constructor () {
    this.tryOrderBeverage()
    this.checkQueue()
  }
  run () {}

  checkQueue () {
    setInterval(() => {
      Queue.ToBeExecuted((QueueElement) => {
        QueueElement.inQueue = false
        QueueElement.waitlist = true
      })
    }, 1000)
  }

  async tryOrderBeverage () {
    const currenList = Queue.elements.filter(QueueElement => QueueElement.waitlist === true)
    console.log(currenList)
    if (currenList.length !== 0) {
      await this.getStatus().then(async () => {
        await this.StartBeverage(currenList[0].productID).then(() => {
          const index = Queue.elements.findIndex(QueueElement => QueueElement.uuid === currenList[0].uuid)
          Queue.elements.splice(index, 1)
        })
        this.tryOrderBeverage()
      }).catch(() => {
        this.tryOrderBeverage()
      })
    } else {
      setTimeout(() => this.tryOrderBeverage(), 3000)
    }
  }

  getStatus () {
    return new Promise((resolve, reject) => {
      request(fakeapi + endpoints.state, (err, res, body) => {
        if (err) {
          reject(new Error('some wrong'))
        } else {
          const response = JSON.parse(body)
          if (response.state === 'ready') {
            resolve(true)
          } else {
            setTimeout(() => reject(new Error('not ready')), 3000)
          }
        }
      })
    })
  }

  StartBeverage (BeverageId) {
    return new Promise((resolve, reject) => {
      request(fakeapi + endpoints.changestate, (err, res, body) => {})
      request(AclInterface + endpoints.order + '(' + BeverageId + ')', (err, res, body) => {
        if (err) {
          reject(new Error('some wrong'))
        } else {
          resolve(true)
        }
      })
    })
  }
}
export const DeamonService = new Service()
