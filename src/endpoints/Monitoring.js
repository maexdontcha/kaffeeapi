import { server } from '../service/Server'
import { LoggingModul } from '../module/Logging'

export const Monitoring = () => {
  server.get('/Monitoring', async (req, res) => {
    res.json(
      { Queue: LoggingModul.QueueLength(),
        DurationTotal: LoggingModul.WorkloadWaitlistecon(),
        EstimatedDeliveryTime: LoggingModul.EstimatedDeliveryTime()
      }
    )
  })
}
