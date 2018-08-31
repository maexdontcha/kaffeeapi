import { server } from '../service/Server'
import { Queue } from '../module/CoffeeQueue'

export const Queueing = () => {
  server.get('/getStatus', async (req, res) => {
    res.json(Queue.elements)
  })

  // Liefert die dauer in sekunden wenn die bestellung in der waitlist ist, sonst null
  server.get('/getEstimatedTime', async (req, res) => {
    res.status(200).json({ estimatedTime: Queue.getEstimatedTime(req.query.uuid) })
  })

  // erstellt eine Liste mit allen einträgen die Aktuellen noch in der Queue liegen
  server.get('/myQueue', async (req, res) => {
    res.status(200).json({ myQueue: Queue.elements.filter(QueueElement => QueueElement.userID === req.query.userid) })
  })
}
