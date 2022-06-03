const asyncHandler = require('express-async-handler')
const Department = require('../Model/Department')
const postionController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { name } = req.body
      const postionExits = await Department.findOne({ name })
      if (postionExits) {
        res.status(400).json('Bộ phận đã tồn tại')
      }
      const position = await Department.create({
        name,
      })
      res.status(200).json('Thêm mới bộ phận thành công')
    } catch (err) {
      throw new Error('Thêm mới bộ phận thất bại!!!')
    }
  }),
  delete: asyncHandler(async (req, res) => {}),
}

module.exports = postionController
