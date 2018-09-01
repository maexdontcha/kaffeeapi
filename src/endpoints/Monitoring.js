import { server } from '../service/Server'
import { LoggingModul } from '../module/Logging'

export const Monitoring = () => {
  server.get('/Monitoring', async (req, res) => {
    await LoggingModul.EstimatedDeliveryTime().then((EstimatedDeliveryTime) => {
      res.json(
        { Queue: LoggingModul.QueueLength(),
          DurationTotal: LoggingModul.WorkloadWaitliste(),
          EstimatedDeliveryTime: EstimatedDeliveryTime
        }
      )
    })
  })
}
