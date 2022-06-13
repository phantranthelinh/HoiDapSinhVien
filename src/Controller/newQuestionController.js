const NewQuestion = require('../Model/newQuestion')
const asyncHandler = require('express-async-handler')

const newQuestionController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { question } = req.body
      const questionExit = await NewQuestion.findOne({ question })
      if (questionExit) {
        res.status(401).json('Câu hỏi đã tồn tại. Vui lòng thêm câu hỏi khác')
        return
      }
      const newQuestion = await NewQuestion.create({ question })
      res.status(200).json(newQuestion)
    } catch (err) {
      res.status(401)
      throw new Error(err)
    }
  }),
  get: asyncHandler(async (req, res) => {
    try {
      const newQuestion = await NewQuestion.findById(req.params.id)
      res.status(200).json(newQuestion)
    } catch (err) {
      throw new Error(err.message)
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      const newQuestions = await NewQuestion.find({}).sort({ createdAt: -1 })
      res.status(200).json(newQuestions)
    } catch (err) {
      throw new Error(err.message)
    }
  }),
  delete: asyncHandler(async (req, res) => {
    try {
      await NewQuestion.findByIdAndRemove(req.params.id)
      res.status(200).json('Xoá thành công!!!')
    } catch (err) {
      throw new Error(err.message)
    }
  }),
}
module.exports = newQuestionController
