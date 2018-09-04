import { Server } from '../service/Server'
import CoffeeObjekt from '../module/OrderObject'
import { Queue } from '../module/CoffeeQueue'
import { VerifyInput } from '../service/VerifyInput'

export const Beverage = () => {
  // Fügt eine bestellung hinzu
  Server.get('/orderBeverage', (req, res) => {
    const Order = {
      'productID': parseInt(req.query.productID),
      'deliveryDate': new Date(req.query.deliveryDate),
      'userID': req.query.userID,
      'header': req.headers
    }
    if (Order.deliveryDate.toString() === 'Invalid Date') {
      Order.deliveryDate = new Date()
    }
    VerifyInput(Order, (err, state) => {
      if (err) {
        res.json({ state: false, message: err.toString() })
      } else {
        const CoffeeOrder = new CoffeeObjekt(Order)
        CoffeeOrder.SaveToMongo()
        res.json({ 'uuid': CoffeeOrder.uuid })
      }
    })
  })

  // Löscht eine Order aus der Queue
  Server.delete('/deleteBeverage', (req, res) => {
    const uuid = req.query.uuid
    Queue.deleteBeverage(uuid, (err, state) => {
      if (err) {
        res.status(200).json({ status: err.toString() })
      } else {
        res.status(200).json({ status: 'True' })
      }
    })
  })

  // Updatet eine Order
  Server.get('/updateBeverage', (req, res) => {
    const uuid = req.query.uuid

    Queue.OrderByUUid(uuid, (err, element) => {
      if (err) {
        res.status(200).json({ status: err.toString() })
      } else {
        const Order = {
          'productID': parseInt(req.query.productID),
          'deliveryDate': new Date(req.query.deliveryDate)
        }

        if (Order.deliveryDate.toString() === 'Invalid Date') {
          Order.deliveryDate = element.deliveryDate
        }
        if (Order.productID === undefined) {
          Order.productID = element.productID
        }

        VerifyInput(Order, (err, state) => {
          if (err) {
            res.json({ state: false, message: err.toString() })
          } else {
            element.update({ 'productID': Order.productID, 'deliveryDate': Order.deliveryDate })
            res.status(200).json({ status: 'True' })
          }
        })
      }
    })
  })
}
