import { Server } from '../service/Server'
import { LoggingModul } from '../module/Logging'

export const Monitoring = () => {
  Server.get('/Monitoring', (req, res) => {
    const Promises = [
      LoggingModul.EstimatedDeliveryTime(),
      LoggingModul.QueueLength(),
      LoggingModul.WorkloadWaitlist(),
      LoggingModul.AllOrdersQuantity(),
      LoggingModul.PriodOrdersQuantity()
    ]
    Promise.all(Promises).then(values => {
      res.json({
        EstimatedDeliveryTime: values[0],
        QueueLength: values[1],
        WorkloadWaitlist: values[2],
        AllOrdersQuantity: values[3],
        PriodOrdersQuantity: values[4]
      })
    })
  })
}
