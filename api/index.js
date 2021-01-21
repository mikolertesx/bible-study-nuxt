import express from 'express'
import connectDB from './db/connectDB'
import versesRoute from './routes/verses'
import authRoute from './routes/auth'
import notesRoute from './routes/notes'
const app = express()

app.use(express.json())
app.use('/verses', versesRoute)
app.use('/auth', authRoute)
app.use('/notes', notesRoute)
connectDB()

module.exports = {
  path: '/api',
  handler: app,
}
