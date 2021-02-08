import mongoose, { Schema } from 'mongoose'

const noteSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    default: '',
  },
  verses: {
    type: [
      {
        id: String,
        originBook: String,
        originChapter: String,
        text: String,
      },
    ],
    default: [],
  },
})

const Note = mongoose.model('Note', noteSchema)

export default Note
