import { Server } from '../service/Server'
import { MachineStates } from '../service/StaticData'
import { ApiRequest, Api, Endpoint, Feedback } from '../service/ApiRequest'

// Endpunkte um den Status der Kaffeemaschiene zu faken
export const fakestatus = () => {
  let state = 'ready'
  Server.get('/fakestatus', (req, res) => {
    res.status(200).json({ state: state })
  })

  Server.get('/changestate', (req, res) => {
    state = MachineStates.run
    setTimeout(() => {
      Promise.all([
        ApiRequest(Api.Acl + Endpoint.cmd + Feedback.EndColor),
        ApiRequest(Api.Acl + Endpoint.cmd + Feedback.EndSpeak)
      ])
        .then(() => {
          // wartet 2 sekunden bevor die Maschine wieder Ready ist
          setTimeout(() => {
            state = MachineStates.ready
          }, 3000)
        })
    }, req.query.duration * 1000)
    res.status(200).json({ state: true })
  })
}
