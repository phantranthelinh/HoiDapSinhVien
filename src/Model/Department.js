const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Department = mongoose.model('Department', departmentSchema)
module.exports = Department
