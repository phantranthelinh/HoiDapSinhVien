const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  listMessage: [
    {
      question: {
        type: String,
        required: true,
      },
      isAnswered: {
        type: Boolean,
        default: false,
      },
      isMoved: {
        type: Boolean,
        default: false,
      },
    },
  ],
})

const Messages = mongoose.model('Messages', messageSchema)

module.exports = Messages
