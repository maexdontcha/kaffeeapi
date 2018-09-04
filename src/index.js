import { DeamonService } from './module/DeamonService'
import { Queue } from './module/CoffeeQueue'

import { Server } from './service/Server'
import { GMT } from './service/DateConverter'

import { Monitoring } from './endpoints/Monitoring'
import { Beverage } from './endpoints/Beverage'
import { Queueing } from './endpoints/Queue'
import { fakestatus } from './endpoints/fakestatus'

import { ApiRequest } from './service/ApiRequest'

// Init Deamon to check the Queue and Execut orders
DeamonService.run()
Queue.LoadOrders()

const Endpoints = []
Endpoints.push(Monitoring, Beverage, Queueing, fakestatus)
Endpoints.map((ep) => { ep() })

const date = new Date()
Server.get('/', (req, res, next) => {
  res.json({ 'status': true, 'message': 'API Running', start: GMT(date).toUTCString() })
})

// const url = 'http://localhost:9000/orderBeverage?productID=3&deliveryDate=2018-08-28T23:29:59&userID=4-fgh354fg5h33gf435'
// ApiRequest(url)
// ApiRequest(url)
// ApiRequest(url)
// ApiRequest(url)
// const url2 = 'http://localhost:9000/orderBeverage?productID=3&deliveryDate=2019-08-28T23:29:59&userID=4-fgh354fg5h33gf435'
// ApiRequest(url2)
// ApiRequest(url2)
// ApiRequest(url2)
// ApiRequest(url2)
