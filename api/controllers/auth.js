// const axios = require('axios')
const User = require('../models/User')

module.exports.postRegisterUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({
      error: 'No username or password given.',
    })
  }

  const newUser = await User.create({
    username,
    password,
  })

  return {
    id: newUser._id,
  }
}
module.exports.postLoginUser = (req, res) => {}
