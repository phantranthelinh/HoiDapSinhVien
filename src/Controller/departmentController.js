const asyncHandler = require('express-async-handler')
const Department = require('../Model/Department')
const postionController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { name } = req.body
      const nameExits = await Department.findOne({ name })
      if (nameExits) {
        res.status(400).json('Bộ phận đã tồn tại')
      }
      const position = await Department.create({
        name,
      })
      res.status(200).json('Thêm mới bộ phận thành công')
    } catch (err) {
      res.status(400).json(err)
      throw new Error('Thêm mới bộ phận thất bại!!!')
    }
  }),
  delete: asyncHandler(async (req, res) => {}),
}

module.exports = postionController