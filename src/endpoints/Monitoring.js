import { Server } from '../service/Server'
import { LoggingModul } from '../module/Logging'

export const Monitoring = () => {
  Server.get('/Monitoring', async (req, res) => {
    const data = [
      LoggingModul.EstimatedDeliveryTime(),
      LoggingModul.QueueLength(),
      LoggingModul.WorkloadWaitlist()
    ]
    Promise.all(data).then(values => {
      res.json({
        EstimatedDeliveryTime: values[0],
        QueueLength: values[1],
        WorkloadWaitlist: values[2]
      })
    })
  })
}
