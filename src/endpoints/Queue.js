import { Server } from '../service/Server'
import { Queue } from '../module/CoffeeQueue'
import { MongoConnection } from '../service/MongoDB'

export const Queueing = () => {
  Server.get('/getStatus', (req, res) => {
    res.json(Queue.elements)
  })

  // Liefert die dauer in sekunden wenn die bestellung in der waitlist ist, sonst null
  Server.get('/getEstimatedTime', (req, res) => {
    res.status(200).json({ estimatedTime: Queue.getEstimatedTime(req.query.uuid) })
  })

  // erstellt eine Liste mit allen einträgen die Aktuellen noch in der Queue liegen
  Server.get('/myQueue', (req, res) => {
    // res.status(200).json({ myQueue: Queue.elements.filter(QueueElement => QueueElement.userID === req.query.userid) })
    MongoConnection().then((connection) => {
      const query = { userID: req.query.userID, delted: false }
      connection.find(query).toArray((err, result) => {
        if (err) throw err
        res.status(200).json({ myQueue: result })
      })
    })
  })
}
