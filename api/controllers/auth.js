import User from '../models/User'

const postRegisterUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({
      error: 'No username or password given.',
    })
  }

  const hasUser = !!(await User.findOne({ username }))

  if (hasUser) {
    return res.json({
      error: 'User already exists.',
    })
  }

  const newUser = await User.create({
    username,
    password,
  })

  return res.json({
    id: newUser._id,
  })
}

const postLoginUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({
      error: 'No username or password given.',
    })
  }

  const user = await User.findOne({ username })
  if (!user) {
    return res.json({
      error: 'No user found with that username.',
    })
  }
  if (user.password !== password) {
    return res.json({
      error: 'Incorrect password',
    })
  }
  return res.json({
    id: user._id,
  })
}

export { postRegisterUser, postLoginUser }
