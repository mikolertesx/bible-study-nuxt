import express from 'express'
import { authHandler, getNotes, postAddNote } from '../controllers/notes'
const router = express.Router
const Router = router()

Router.use('/', authHandler)
Router.post('/add-note', postAddNote)
Router.post('/update-note', () => {})
Router.post('/delete-note', () => {})
Router.get('/notes', getNotes)

export default Router
