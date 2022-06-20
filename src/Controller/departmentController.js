const asyncHandler = require('express-async-handler')
const Department = require('../Model/Department')
const postionController = {
  add: asyncHandler(async (req, res) => {
    try {
      const { name } = req.body
      const nameExits = await Department.findOne({ name })
      if (nameExits) {
        res.status(400).json('Bộ phận đã tồn tại')
        return
      }
      await Department.create({
        name,
      })
      res.status(201).json('Thêm mới thành công')
    } catch (err) {
      res.status(400).json(err)
      throw new Error('Thêm mới thất bại!!!')
    }
  }),
  get: asyncHandler(async (req, res) => {
    try {
      const department = await Department.findById(req.params.id).populate('users')
      res.status(200).json(department)
    } catch (err) {
      res.status(400).json(err)
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      console.log(req.user)
      const departments = await Department.find({})
      res.status(200).json(departments)
    } catch (err) {
      res.status(400).json(err)
    }
  }),
  edit: asyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id)
    const { name } = req.body
    if (department) {
      department.name = name || department.name
      const updatedDepartments = await department.save()
      res.status(200).json(updatedDepartments)
    } else {
      res.status(400)
      throw new Error('Không tìm thấy đơn vị')
    }
  }),

  delete: asyncHandler(async (req, res) => {
    try {
      await Department.findByIdAndRemove(req.params.id)
      res.status(204).json('Xóa thành công!!!')
    } catch (err) {
      res.status(400).json(err)
    }
  }),
}

module.exports = postionController
