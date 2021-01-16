import express from 'express'
import connectDB from './db/connectDB'
import versesRoute from './routes/verses'
import authRoute from './routes/auth'
const app = express()

app.use(express.json())
app.use('/verses', versesRoute)
app.use('/auth', authRoute)
connectDB()

module.exports = {
  path: '/api',
  handler: app,
}
