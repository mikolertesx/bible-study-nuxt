import User from '../models/User'
import ValidationError from '../models/ValidationError'

const postAddNote = async (req, res) => {
  console.log(req.body)
  const { user } = res.locals
  const { text, verses } = req.body
  if (!text || !verses) {
    return res.json({
      error: 'No text or verses found',
    })
  }
  // TODO Add validation of notes with a model instead of creating them like that
  user.notes.push({
    text,
    verses,
  })
  await user.save()
  return res.json({
    message: 'Ok',
  })
}
const postUpdateNote = () => {}
const postDeleteNote = () => {}
const getNotes = (req, res) => {
  const { user } = res.locals
  return res.json({
    notes: user.notes,
  })
}
const authHandler = async (req, res, next) => {
  const { token } = req.headers
  try {
    if (!token) {
      throw new ValidationError("Token wasn't specified")
    }
    // Reformat later
    let user
    try {
      user = await User.findById(token)
      if (!user) {
        throw new Error('Failed to find user')
      }
    } catch (err) {
      throw new ValidationError('User with token was not found')
    }
    res.locals.user = user
    return next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({
      error: 'Failed auth',
      details: err.details || 'An error ocurred',
    })
  }
}

export { postAddNote, postUpdateNote, postDeleteNote, getNotes, authHandler }
