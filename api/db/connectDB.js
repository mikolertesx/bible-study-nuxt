const mongoose = require('mongoose')

const connectDB = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export default connectDB
