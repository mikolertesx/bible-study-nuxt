import User from '../models/User'

const postRegisterUser = async (req, res) => {
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

const postLoginUser = (req, res) => {}

export { postRegisterUser, postLoginUser }
