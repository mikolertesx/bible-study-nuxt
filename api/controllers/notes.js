import ValidationError from '../models/ValidationError'
import User from '../models/User'
import Note from '../models/Note'

const getUserOrThrow = async (token) => {
  try {
    const userFound = await User.findById(token)
    if (!userFound) {
      throw new Error('Failed to find user')
    }
    return userFound
  } catch (err) {
    throw new ValidationError('User with token was not found')
  }
}

const postAddNote = async (req, res) => {
  const { user } = res.locals
  const { text, verses } = req.body
  if (!text || !verses) {
    return res.json({
      error: 'No text or verses found',
    })
  }

  const newNote = await Note.create({
    owner: user._id,
    text,
    verses,
  })

  // TODO Update to a non-deprecated function
  await User.updateOne({ _id: user._id }, { $push: { notes: newNote._id } })

  return res.json({
    message: 'Ok',
    id: newNote._id,
  })
}
const postUpdateNote = () => {}
const postDeleteNote = async (req, res) => {
  const { user } = res.locals
  const { id } = req.body

  const FoundNote = await Note.findById(id)
  if (!FoundNote) {
    return res.json({
      error: 'Note not found',
    })
  }

  if (user._id.toString() !== FoundNote.owner.toString()) {
    return res.json({
      error: 'You are not allowed to delete this note',
    })
  }

  // This two can be done at the same time.
  await Promise.all([Note.findByIdAndRemove(id), user.notes.pull({ _id: id })])
  await user.save()

  return res.json({
    message: 'Deleted successfully',
  })
}
const getNotes = async (req, res) => {
  const { user } = res.locals
  const { chapter } = req.query
  const populatedUser = await user.populate('notes').execPopulate()
  let populatedNotes = [...populatedUser.notes]

  // TODO Make the filter through the DB
  if (chapter) {
    populatedNotes = populatedNotes.filter(
      (note) => note.verses[0].originChapter.toString() === chapter.toString()
    )
  }

  return res.json({
    notes: populatedNotes,
  })
}
const authHandler = async (req, res, next) => {
  const { token } = req.headers
  try {
    if (!token) {
      throw new ValidationError("Token wasn't specified")
    }
    const user = await getUserOrThrow(token)
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
