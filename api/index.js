const express = require('express')
const app = express()

const versesRoute = require('./routes/verses')

app.use('/verses', versesRoute)

module.exports = {
  path: '/api',
  handler: app,
}
