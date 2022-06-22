const Message = require('../Model/Message')
const asyncHandler = require('express-async-handler')

const messageController = {
  addQuestionFromUser: asyncHandler(async (req, res) => {
    try {
      const { question } = req.body
      const questionExit = await Message.findOne({ 'listMessage.question': question })
      if (questionExit) {
        throw new Error('Câu hỏi đã tồn tại')
      }
      await Message.updateOne(
        { idUser: { _id: process.env.ID_ADMIN } },
        { $push: { listMessage: { question: question } } }
      )
      res.status(200).json('Chuyển câu hỏi cho admin thành công!')
    } catch (err) {
      throw new Error(err)
    }
  }),
  get: asyncHandler(async (req, res) => {
    try {
      const message = await Message.findOne({ idUser: { _id: req.params.id } }).select(
        'listMessage'
      )
      res.status(200).json(message)
    } catch (err) {
      throw new Error(err)
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({}).populate({ path: 'idUser', select: 'from' })
      res.status(200).json(messages)
    } catch (err) {
      throw new Error('Thất bại')
    }
  }),
  delete: asyncHandler(async (req, res) => {
    try {
      await Message.findOneAndUpdate(
        { idUser: req.user._id },
        { $pull: { listMessage: { _id: req.params.id } } }
      )
      res.status(200).json('Xóa thành công')
    } catch (err) {
      throw new Error('Thất bại')
    }
  }),
  sendTo: asyncHandler(async (req, res) => {
    try {
      const { toId, question } = req.body
      console.log(toId)
      const idCurrentUser = req.user._id.toString()
      // await Message.findOneAndUpdate(
      //   { idUser: idCurrentUser },
      //   { $pull: { listMessage: { question: question } } }
      // )
      // const users = await Message.find({}).populate({
      //   path: 'idUser',
      //   select: '_id from',
      // })

      // const userRecieves = users.filter((user) => {
      //   if (user.idUser.from) {
      //     return user.idUser.from.toString() === toId
      //   }
      // })

      console.log(userReceive)

      res.status(200).json('Chuyển đến câu hỏi đến đơn vị thành công')
    } catch (err) {
      throw new Error(err)
    }
  }),
}
module.exports = messageController
