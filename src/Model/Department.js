const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Department = mongoose.model('department', departmentSchema)
module.exports = Department
