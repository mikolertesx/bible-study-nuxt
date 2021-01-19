import express from 'express'
import {
  postLoginUser,
  postRegisterUser,
  noDBSetUpHandler,
} from '../controllers/auth'
const router = express.Router
const Router = router()

if (!process.env.DB_URL) {
  console.warn('DB Auth Services are disabled')
  Router.use('/', noDBSetUpHandler)
} else {
  Router.post('/register-user', postRegisterUser)
  Router.post('/login-user', postLoginUser)
}

export default Router
