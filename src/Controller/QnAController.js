const QnA = require('../Model/QnA')
const asyncHandler = require('express-async-handler')
var vntk = require('vntk')
const commonWords = require('../utils/commonWords')
var pos_tag = vntk.posTag()
const csv = require('csvtojson')
const QnAController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { question, answer, by } = req.body
      const questionExit = await QnA.findOne({ question })
      if (questionExit) {
        res.status(401).json('Câu hỏi đã tồn tại. Vui lòng thêm câu hỏi khác')
        return
      }

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
      res.status(500).json(err)
    }
  }),

  getQnAs: asyncHandler(async (req, res) => {
    try {
      const limit = req.query.limit || 5
      const keyword = req.query.keyword
        ? {
            keywords: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {}
      const QAs = await QnA.find({ ...keyword })
        .populate({ path: 'by', select: 'name' })
        .limit(limit)

      res.status(200).json(QAs)
    } catch (err) {
      throw new Error(err.message)
    }
  }),
  getAllQnAs: asyncHandler(async (req, res) => {
    try {
      const keyword = req.query.keyword
        ? {
            keywords: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {}
      const pageSize = 12
      const page = Number(req.query.page) || 1

      const count = await QnA.countDocuments({})

      const QAs = await QnA.find({ ...keyword })
        .populate({ path: 'by', select: 'name' })
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 })

      res.status(200).json({ QAs, page, pages: Math.ceil(count / pageSize) })
    } catch (err) {
      throw new Error(err.message)
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
      res.status(200).json('Xóa thành công Q&A')
    } catch (err) {
      res.status(500).json(err)
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
      const data = await csv().fromfile(req.body.file)
      res.status(200).json(req.body.file)
    } catch (err) {}
  }),
}
module.exports = QnAController
