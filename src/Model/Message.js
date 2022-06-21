const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: [
    {
      question: {
        type: String,
        required: true,
      },
    },
  ],
})

const Messages = mongoose.model('messages', messageSchema)

module.exports = Messages
