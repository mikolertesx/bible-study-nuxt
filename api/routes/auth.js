import express from 'express'
import { postLoginUser, postRegisterUser } from '../controllers/auth'
const router = express.Router
const Router = router()

Router.post('/register-user', postRegisterUser)
Router.post('/login-user', postLoginUser)

export default Router
