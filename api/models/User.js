import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  notes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    default: [],
  },
})

const User = mongoose.model('User', userSchema)

export default User
