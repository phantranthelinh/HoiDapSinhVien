const QnA = require('../Model/QnA')
const asyncHandler = require('express-async-handler')
var vntk = require('vntk')
const commonWords = require('../utils/commonWords')
var pos_tag = vntk.posTag()
const csvtojson = require('csvtojson')
const Messages = require('../Model/Message')
const fs = require('fs')

const QnAController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { question, answer, by } = req.body
      const questionExit = await QnA.findOne({ question })
      if (questionExit) {
        res.status(401).json({ message: 'Câu hỏi đã tồn tại. Vui lòng thêm câu hỏi khác' })
        return
      }
      const filter = {
        idUser: process.env.ID_ADMIN,
        'listMessage.question': question,
      }
      await Messages.updateOne(
        { idUser: req.user._id },
        { $pull: { listMessage: { question: question } } }
      )
      await Messages.updateOne(filter, {
        $set: { 'listMessage.$.isAnswered': true, 'listMessage.$.question': question },
      })

      const arrayKeywords = pos_tag.tag(question)
      const keywords = []
      arrayKeywords.map((word) => {
        if (commonWords.indexOf(word[0].toLowerCase()) === -1) {
          keywords.push(word[0].toLowerCase())
        }
      })

      const newQA = new QnA({ question, answer, by, keywords })
      const savedQA = await newQA.save()
      res.status(200).json(savedQA)
    } catch (err) {
      res.status(401)
      throw new Error(err)
    }
  }),
  extractKeywordFromQuestion: asyncHandler(async (req, res) => {
    try {
      const { question } = req.body
      const arrayKeywords = pos_tag.tag(question)
      const keywords = []
      arrayKeywords.map((word) => {
        if (commonWords.indexOf(word[0].toLowerCase()) === -1) {
          keywords.push(word[0].toLowerCase())
        }
      })
      res.status(200).json(keywords)
    } catch (err) {
      res.status(400).json(err)
    }
  }),

  getQnAs: asyncHandler(async (req, res) => {
    try {
      const { keywords } = req.body
      const qnas = await QnA.find({ keywords: { $in: keywords } }).populate({
        path: 'by',
        select: 'name _id',
      })
      res.status(200).json(qnas)
    } catch (err) {
      res.status(400).json(err)
    }
  }),
  getAllQnAs: asyncHandler(async (req, res) => {
    try {
      const inputSearch = req.query.search
        ? {
            keywords: {
              $regex: req.query.search,
              $options: 'i',
            },
          }
        : {}
      const pageSize = 4
      const page = Number(req.query.page) || 1

      const count = await QnA.countDocuments({})

      const QAs = await QnA.find({ ...inputSearch })
        .populate({ path: 'by', select: 'name' })
        .skip(pageSize * page)
        .sort({ createdAt: -1 })

      res.status(200).json({ QAs, page, pages: Math.ceil(count / pageSize) })
    } catch (err) {
      throw new Error(err.message)
    }
  }),

  searchQnA: asyncHandler(async (req, res) => {
    try {
      if (!req.query.question) {
        res.json(null)
        return
      }

      // const qnas = await QnA.find({
      //   'question.normalize()': {
      //     $regex: req.query.question,
      //     $options: 'ui',
      //   },
      // })
      const qnas = await QnA.find(
        { $text: { $search: req.query.question } },
        { score: { $meta: 'textScore' } }
      ).sort({
        createdAt: -1,
      })

      res.status(200).json(qnas)
    } catch (err) {
      throw new Error(err)
    }
  }),
  getSingleQnA: asyncHandler(async (req, res) => {
    try {
      const qna = await QnA.findById(req.params.id).populate({ path: 'by', select: 'name _id' })
      res.status(200).json(qna)
    } catch (err) {
      throw new Error(err)
    }
  }),
  delete: asyncHandler(async (req, res) => {
    try {
      await QnA.deleteOne({ _id: req.params.id })
      res.status(204).json('Xóa thành công Q&A')
    } catch (err) {
      res.status(400).json(err)
    }
  }),
  edit: asyncHandler(async (req, res) => {
    const { question, answer, by } = req.body
    const questionExit = await QnA.findOne({ question })
    if (questionExit) {
      throw new Error('Câu hỏi đã tồn tại!!!')
    }
    const qna = await QnA.findById(req.params.id)
    const arrayKeywords = pos_tag.tag(question)
    const keywords = []
    arrayKeywords.map((word) => {
      if (commonWords.indexOf(word[0].toLowerCase()) === -1) {
        keywords.push(word[0].toLowerCase())
      }
    })
    if (qna) {
      qna.question = question || qna.question
      qna.answer = answer || qna.answer
      qna.by = by || qna.by
      qna.keywords = keywords || qna.keywords
      const updatedQna = await qna.save()
      res.status(200).json(updatedQna)
    } else {
      res.status(400)
      throw new Error('Q&A không tìm thấy')
    }
  }),
  addWithFile: asyncHandler(async (req, res) => {
    try {
      const byId = req.user.from || req.body.by

      const filePath = './public/import_data.csv'

      const data = await csvtojson().fromFile(filePath)

      data.map(async (item) => {
        const { question, answer } = item

        const questionExits = await QnA.findOne({ question })
        if (questionExits) {
          return
        } else {
          const arrayKeywords = pos_tag.tag(question)
          const keywords = []
          arrayKeywords.map((word) => {
            if (commonWords.indexOf(word[0].toLowerCase()) === -1) {
              keywords.push(word[0].toLowerCase())
            }
          })
          await QnA.create({ question, answer, by: byId, keywords })
        }
      })
      if (data) {
        // delete file import_data.csv
        fs.unlink(filePath, (err) => {
          if (err) throw err
          console.log('File deleted!')
        })
      }

      res.status(200).json({ message: 'Thêm mới thành công' })
    } catch (err) {
      res.status(500).json(err)
    }
  }),
  happy: asyncHandler(async (req, res) => {
    try {
      const { idUser } = req.body
      const userChoosedHappy = await QnA.findOne({ happies: idUser })
      if (userChoosedHappy) {
        res.status(300).json({ message: 'Bạn bình chọn rồi' })
      }

      await QnA.findByIdAndUpdate(req.params.id, { $push: { happies: idUser } }, { new: true })
      await QnA.findByIdAndUpdate(req.params.id, { $pull: { unhappies: idUser } })
      res.status(200).json({ message: 'Thành công' })
    } catch (err) {
      res.status(500).json(err)
    }
  }),
  unhappy: asyncHandler(async (req, res) => {
    try {
      const { idUser } = req.body
      await QnA.findByIdAndUpdate(req.params.id, { $push: { unhappies: idUser } }, { new: true })
      await QnA.findByIdAndUpdate(req.params.id, { $pull: { happies: idUser } }, { new: true })

      res.status(200).json('Thành công')
    } catch (err) {
      res.status(500).json(err)
    }
  }),
}

module.exports = QnAController
