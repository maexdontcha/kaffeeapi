import { Server } from '../service/Server'
import CoffeeObjekt from '../module/OrderObject'
import { Queue } from '../module/CoffeeQueue'

export const Beverage = () => {
  Server.get('/orderBeverage', async (req, res) => {
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
    Order.SaveToMongo()
    res.json({ 'uuid': Order.uuid })
  })

  Server.delete('/deleteBeverage', async (req, res) => {
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
  Server.get('/updateBeverage', async (req, res) => {
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
}
