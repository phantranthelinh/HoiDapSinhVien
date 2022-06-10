const mongoose = require('mongoose')

const newQuestionSchema = mongoose.Schema(
  {
    question: {
      type: 'String',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const NewQuestion = mongoose.model('Newquestion', newQuestionSchema)

module.exports = NewQuestion
