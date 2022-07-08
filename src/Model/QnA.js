var slug = require('mongoose-slug-generator')
const mongoose = require('mongoose')
mongoose.plugin(slug)

const emojiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const QnASchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
    },
    answer: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: ['question', 'id'],
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    happies: [emojiSchema],
    unhappies: [emojiSchema],
  },
  { timestamps: true }
)

const QnA = mongoose.model('QnA', QnASchema)
QnASchema.index({ question: 'text' })
module.exports = QnA
