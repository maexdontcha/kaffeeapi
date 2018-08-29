// var server = require('http').Server(app)
// const fs = require('fs')
// const http = require('http')
// const { parse } = require('querystring')
//
import CoffeeObjekt from './OrderObject'
import { Queue } from './CoffeeQueue'
import { DeamonService } from './DeamonService'

DeamonService.run()

const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  )
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    return next()
  }
})

app.get('/', (req, res, next) => {
  res.json({'status': true, 'message': 'API Running'})
})

let state = 'ready'
app.get('/orderBeverage', async (req, res) => {
  const productID = req.query.productID
  const deliveryDate = req.query.deliveryDate
  const userID = req.query.userID

  const Order = new CoffeeObjekt({'productID': productID, 'deliveryDate': deliveryDate, 'userID': userID})

  res.json({ 'uuid': Order.uuid })
  // Return the articles to the rendering engine
})

app.get('/getStatus', async (req, res) => {
  res.json(Queue.elements)
})

app.delete('/deleteBeverage', async (req, res) => {
  const uuid = req.query.uuid
  Queue.deleteBeverage(uuid, (err, state) => {
    if (err) {
      res.status(200).json({ status: err.toString() })
    } else {
      res.status(200).json({ status: 'True' })
    }
  })
})

app.get('/updateBeverage', async (req, res) => {
  const uuid = req.query.uuid
  console.log(uuid)
  console.log(req.query.deliveryDate)

  Queue.OrderByUUid(uuid, (err, element) => {
    if (err) {
      res.status(200).json({ status: err.toString() })
    } else {
      const productID = req.query.productID
      const deliveryDate = req.query.deliveryDate
      const userID = req.query.userID
      element.update({'productID': productID, 'deliveryDate': deliveryDate, 'userID': userID})
      res.status(200).json({ status: 'True' })
    }
  })
})

app.get('/getEstimatedTime', async (req, res) => {
  // const uuid = req.query.uuid
  // const Element = DeamonService.list.find(QueueElement => QueueElement.uuid === uuid)
  // if (Element) {
  //   const index = DeamonService.list.findIndex(QueueElement => QueueElement.uuid === uuid)
  //   res.status(200).json({ 'estimatedTime': 180 * index })
  // } else {
  //   const Element = Queue.elements.find(QueueElement => QueueElement.uuid === uuid)
  //   if (Element) {
  //     res.status(200).json({ 'state': true, 'message': 'bestellung in der zukunft' })
  //   } else {
  //     res.status(200).json({ 'state': false, 'message': 'uuid nicht gefunden' })
  //   }
  // }
})


app.get('/fakestatus', async (req, res) => {
  // "ready"
  // "isRunning"
  res.status(200).json({ state: state})
})

app.get('/changestate', async (req, res) => {
  const x = () => {
    state = 'isRunning'
    setTimeout(() => state = 'ready', 30000)
  }
  x()
  res.status(200).json({ state: true})
})

var listener = app.listen(9000, err => {
  if (err) throw err
  console.log('Listening on http://localhost:' + listener.address().port)
})
