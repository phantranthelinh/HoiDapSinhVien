const Messages = require('../Model/Message')
const asyncHandler = require('express-async-handler')

const messageController = {
  addQuestionFromUser: asyncHandler(async (req, res) => {
    try {
      const idUserExit = await Messages.findOne({ idUser: req.body.idUser })
      if (idUserExit) {
        res.status(400).json('Lỗi!')
        return
      }
      await Messages.create({ idUser: req.body.idUser })
      // await Messages.updateOne(
      //   { idUser: '628dd221fd0382890782ab68' },
      //   { $push: { messages: { question: req.body.question } } }
      // )
      res.status(200).json('Chuyển câu hỏi cho admin thành công!')
    } catch (err) {
      throw new Error('Thất bại')
    }
  }),
  get: asyncHandler(async (req, res) => {}),
  getAll: asyncHandler(async (req, res) => {
    try {
      const messages = await Messages.find({})
      res.status(200).json(messages)
    } catch (err) {
      throw new Error('Thất bại')
    }
  }),
  delete: asyncHandler(async (req, res) => {}),
}
module.exports = messageController
