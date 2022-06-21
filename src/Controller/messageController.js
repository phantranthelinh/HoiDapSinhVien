const Message = require('../Model/Message')
const asyncHandler = require('express-async-handler')

const messageController = {
  addQuestionFromUser: asyncHandler(async (req, res) => {
    try {
      const { question } = req.body
      await Message.updateOne(
        { idUser: process.env.ID_ADMIN },
        { $push: { listMessage: { question: question } } }
      )
      res.status(200).json('Chuyển câu hỏi cho admin thành công!')
    } catch (err) {
      throw new Error('Thất bại')
    }
  }),
  get: asyncHandler(async (req, res) => {
    try {
      const message = await Message.findOne({ idUser: req.params.id }).select('listMessage')
      res.status(200).json(message)
    } catch (err) {
      throw new Error(err)
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({})
      res.status(200).json(messages)
    } catch (err) {
      throw new Error('Thất bại')
    }
  }),
  delete: asyncHandler(async (req, res) => {}),
}
module.exports = messageController
