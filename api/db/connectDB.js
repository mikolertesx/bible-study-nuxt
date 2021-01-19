const mongoose = require('mongoose')
const connectDB = () => {
  if (process.env.DB_URL) {
    return mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  }
  console.error('No DB was set up')
  return null
}

export default connectDB
