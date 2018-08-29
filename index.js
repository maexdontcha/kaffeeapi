
import CoffeeObjekt from './module/OrderObject'
import { Queue } from './module/CoffeeQueue'
import { DeamonService } from './module/DeamonService'
import { ApiRequest, Api, Endpoint } from './service/ApiRequest'
import { MaschineStates, entryScreen } from './service/StaticData'

// Init Deamon to check the Queue and Execut orders
DeamonService.run()

// Render entryScreen
entryScreen()

// const request = require('request')

const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header(
    'Access-Control-Expose-Headers',
    'Content-Length',
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Credentials', 'true',
    'Access-Control-Allow-Origin', req.get('Origin') || '*',
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
  res.json({ 'status': true, 'message': 'API Running' })
})

app.get('/orderBeverage', async (req, res) => {
  const productID = req.query.productID
  let deliveryDate = req.query.deliveryDate
  const userID = req.query.userID
  if (!deliveryDate) {
    let deliveryDate = new Date()
  }
  const Order = new CoffeeObjekt({
    'productID': productID,
    'deliveryDate': deliveryDate,
    'userID': userID,
    'httpreq': req
  })
  res.json({ 'uuid': Order.uuid })
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

// Liefert die dauer in sekunden wenn die bestellung in der waitlist ist, sonst null
app.get('/updateBeverage', async (req, res) => {
  const uuid = req.query.uuid

  Queue.OrderByUUid(uuid, (err, element) => {
    if (err) {
      res.status(200).json({ status: err.toString() })
    } else {
      const productID = req.query.productID
      const deliveryDate = req.query.deliveryDate
      const userID = req.query.userID
      element.update({ 'productID': productID, 'deliveryDate': deliveryDate, 'userID': userID })
      res.status(200).json({ status: 'True' })
    }
  })
})

// Liefert die dauer in sekunden wenn die bestellung in der waitlist ist, sonst null
app.get('/getEstimatedTime', async (req, res) => {
  res.status(200).json({ estimatedTime: Queue.getEstimatedTime(req.query.uuid) })
})

// erstellt eine Liste mit allen einträgen die Aktuellen noch in der Queue liegen
app.get('/myQueue', async (req, res) => {
  res.status(200).json({ myQueue: Queue.elements.filter(QueueElement => QueueElement.userID === req.query.userid) })
})

// Endpunkte um den Status der Kaffeemaschiene zu faken
let state = 'ready'
app.get('/fakestatus', async (req, res) => {
  res.status(200).json({ state: state })
})

app.get('/changestate', async (req, res) => {
  state = MaschineStates.run
  setTimeout(async () => {
    state = MaschineStates.ready
    await ApiRequest(Api.Acl + Endpoint.cmd + 'setLight(200,100,0)')
    await ApiRequest(Api.Acl + Endpoint.cmd + 'Speak exp:="Wir Danken Philipp und Max für die tolle Api"')
  }, req.query.duration * 1000)
  res.status(200).json({ state: true })
})

// App Run on port 9000
app.listen(9000, err => {
  if (err) throw err
  // console.log('Listening on http://localhost:' + listener.address().port)
})
