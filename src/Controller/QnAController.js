const QnA = require('../Model/QnA')
const asyncHandler = require('express-async-handler')
const QnAController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { question, answer, by, keywords } = req.body
      const questionExit = await QnA.findOne({ question })
      if (questionExit) {
        res.status(401).json('Câu hỏi đã tồn tại. Vui lòng thêm câu hỏi khác')
      }
      const newQA = new QnA({ question, answer, by, keywords })
      const savedQA = await newQA.save()
      res.status(200).json(savedQA)
    } catch (err) {
      res.status(401)
      throw new Error('Thêm câu hỏi và câu trả lời thất bại!!')
    }
  }),
  getQnAs: asyncHandler(async (req, res) => {
    try {
      const question = req.query.question
        ? {
            question: {
              $regex: req.query.question,
              $options: 'i',
            },
          }
        : {}
      const QAs = await QnA.find({ ...question }).limit(5)

      res.status(200).json(QAs)
    } catch (err) {
      throw new Error(err.message)
    }
  }),
  getSingleQnA: asyncHandler(async (req, res) => {
    try {
      const questionId = req.params.id
      const qna = await QnA.findById(questionId)
      res.status(200).json(qna)
    } catch (err) {
      throw new Error(err)
    }
  }),
  delete: asyncHandler(async (req, res) => {
    try {
      await QnA.deleteOne({ _id: req.params.id })
      res.status(200).json('Xóa thành công Q&A')
    } catch (err) {
      res.status(500).json(err)
    }
  }),
  update: asyncHandler(async (req, res) => {
    const { question, answer } = req.body
    const qna = await QnA.findById(req.params.id)

    if (qna) {
      qna.question = question || product.question
      qna.answer = answer || product.answer
      // qna.keywords = keywords || product.keywords
      const updatedQna = await qna.save()
      res.status(200).json(updatedQna)
    } else {
      res.status(400)
      throw new Error('Q&A không tìm thấy')
    }
  }),
}
module.exports = QnAController
