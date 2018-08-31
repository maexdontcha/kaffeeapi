const express = require('express')
export const server = express()

server.use((req, res, next) => {
  res.header(
    'Access-Control-Expose-Headers',
    'Content-Length',
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Credentials', 'true',
    'Access-Control-Allow-Origin', req.get('Origin') || '*',
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  )
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    return next()
  }
})

// server Run on port 9000
server.listen(9000, err => {
  if (err) throw err
  // console.log('Listening on http://localhost:' + listener.address().port)
})
