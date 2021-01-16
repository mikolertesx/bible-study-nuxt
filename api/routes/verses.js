import express from 'express'
import { versesGet } from '../controllers/verses'
const router = express.Router
const Router = router()

Router.get('/verses', versesGet)

export default Router
