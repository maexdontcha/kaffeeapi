import { server } from '../service/Server'
import { MaschineStates } from '../service/StaticData'
import { ApiRequest, Api, Endpoint } from '../service/ApiRequest'

// Endpunkte um den Status der Kaffeemaschiene zu faken
export const fakestatus = () => {
  let state = 'ready'
  server.get('/fakestatus', async (req, res) => {
    res.status(200).json({ state: state })
  })

  server.get('/changestate', async (req, res) => {
    state = MaschineStates.run
    setTimeout(async () => {
      state = MaschineStates.ready
      await ApiRequest(Api.Acl + Endpoint.cmd + 'setLight(200,100,0)')
      await ApiRequest(Api.Acl + Endpoint.cmd + 'Speak exp:="Wir Danken Philipp und Max für die tolle Api"')
    }, req.query.duration * 1000)
    res.status(200).json({ state: true })
  })
}
