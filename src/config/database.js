const mongoose = require('mongoose')
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL_LOCAL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log('Connected to Mongo')
  } catch (err) {
    console.log(`Error : ${err.message}`)
    process.exit(1)
  }
}
module.exports = connectDatabase
