const request = require('request')

// Urls für die API und das ACL Interface
export const Api = {
  Acl: 'http://localhost:8000',
  Fake: 'http://localhost:9000'
}

// Endpoints
export const Endpoint = {
  cmd: '/sendCommand?cmd=',
  // state: '/getStatus'
  state: '/fakestatus',
  changestate: '/changestate'
}

// Kommandos
export const Feedback = {
  StartColor: 'setLight(r=10 g=255 b=10)',
  EndColor: 'setLight(r=255 g=10 b=10)',
  StartSpeak: 'Speak exp:="James Starte den Motor! Auf gehts"',
  EndSpeak: 'Speak exp:="Ihr Kaffee ist fertig, Vielen Dank"'
}

// ApiRequest als Objekt
// Liefert ein Promise und als ergebnis den Body
export const ApiRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(new Error('Kritischer ApiRequest Fehler'))
      } else {
        if (res.statusCode === 200) {
          resolve(body)
        } else {
          reject(new Error('Umbekannter ApiRequest Fehler'))
        }
      }
    })
  })
}

// urlBuilder als Objekt
// export const urlBuilder = () => {
//   return new Promis((resolve, reject) => {
//   })
// }
