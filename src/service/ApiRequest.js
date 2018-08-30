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

// ApiRequest als Objekt
// Liefert ein Promise und als ergebnis den Body
export const ApiRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(new Error('Kritischer Fehler'))
      } else {
        if (res.statusCode == 200){
          resolve(body)
        } else {
          reject(new Error('Umbekannter Fehler'))
        }
      }
    })
  })
}

// urlBuilder als Objekt
export const urlBuilder = () => {
  return new Promis((resolve, reject) => {
  })
}
