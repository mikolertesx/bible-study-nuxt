const router = require('express').Router
const controller = require('../controllers/auth')
const Router = router()

Router.post('/register-user', controller.postRegisterUser)
Router.post('/login-user', controller.postLoginUser)

module.exports = Router
