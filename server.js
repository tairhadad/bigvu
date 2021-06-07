const express = require('express')
const jsonServer = require('json-server')
const chokidar = require('chokidar')
const cors = require('cors')
const https = require('https')
const fileName = './presenters.json'

const app = express()
const router = express.Router()

app.use(cors())
app.use(jsonServer.bodyParser)
app.use('/api', (req, res, next) => router(req, res, next))

var url = 'https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json'

https
  .get(url, function (res) {
    var body = ''

    res.on('data', function (chunk) {
      body += chunk
    })

    res.on('end', function () {
      var fbResponse = JSON.parse(body)
      app.get('/getImageList', function (req, res) {
        res.send(fbResponse)
      })
    })
  })
  .on('error', function (err) {
    console.log('Got an error: ', err)
  })

const createServer = () => {
  delete require.cache[require.resolve(fileName)]
  setTimeout(() => {
    const router = jsonServer.router(
      fileName.endsWith('.json') ? require(fileName)() : fileName,
    )
  }, 100)
}

chokidar.watch(fileName).on('change', () => {
  console.log('Reloading web service data...')
  createServer()
  console.log('Reloading web service data complete.')
})
let port = process.env.PORT
if (port == null || port == '') {
  port = 8500
}

app.listen(port, () => console.log(`Web service running on port ${port}`))
