const router = require('express').Router
const controller = require('../controllers/verses')
const Router = router()

Router.get('/verses', controller.versesGet)

module.exports = Router
