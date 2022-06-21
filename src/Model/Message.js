const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listMessage: [
    {
      question: {
        type: String,
        required: true,
      },
    },
  ],
})

const Messages = mongoose.model('Messages', messageSchema)

module.exports = Messages
