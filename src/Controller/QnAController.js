const QnA = require('../Model/QnA')
const asyncHandler = require("express-async-handler"); 
const QnAController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { question, answer, by ,keywords } = req.body;
      const questionExit = await QnA.findOne({ question });
      if (questionExit) {
        res.status(401).json("Câu hỏi đã tồn tại. Vui lòng thêm câu hỏi khác");
      }
      const newQA = new QnA({ question, answer,by, keywords });
      const savedQA = await newQA.save();
      res.status(200).json(savedQA);
    } catch (err) {
      res.status(401);
      throw new Error("Thêm câu hỏi và câu trả lời thất bại!!");
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      const QAs = await QnA.find({});
      res.status(200).json(QAs);
    } catch (err) {
      throw new Error(err.message);
    }
  }),
};
module.exports = QnAController
