const express = require('express')
const connectDB = require('./db/connectDB')
const app = express()
const versesRoute = require('./routes/verses')
const authRoute = require('./routes/auth')

app.use(express.json())
app.use('/verses', versesRoute)
app.use('/auth', authRoute)
connectDB()

module.exports = {
  path: '/api',
  handler: app,
}
