import { Server } from '../service/Server'
import { MachineStates } from '../service/StaticData'
import { ApiRequest, Api, Endpoint } from '../service/ApiRequest'

// Endpunkte um den Status der Kaffeemaschiene zu faken
export const fakestatus = () => {
  let state = 'ready'
  Server.get('/fakestatus', async (req, res) => {
    res.status(200).json({ state: state })
  })

  Server.get('/changestate', async (req, res) => {
    state = MachineStates.run
    setTimeout(async () => {
      await ApiRequest(Api.Acl + Endpoint.cmd + 'setLight(200,100,0)')
      await ApiRequest(Api.Acl + Endpoint.cmd + 'Speak exp:="Wir Danken Philipp und Max für die tolle Api"')
      // wartet 2 sekunden bevor die Maschine wieder Ready ist
      setTimeout(() => {
        state = MachineStates.ready
      }, 2000)
    }, req.query.duration * 1000)
    res.status(200).json({ state: true })
  })
}
