var slug = require('mongoose-slug-generator')
const mongoose = require('mongoose')
mongoose.plugin(slug)
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
      slug: 'question',
      unique: true,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department' || 'User',
    },
  },
  { timestamps: true }
)

const QnA = mongoose.model('QnA', QnASchema)
module.exports = QnA
