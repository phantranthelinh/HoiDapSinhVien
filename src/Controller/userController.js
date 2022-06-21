const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../Model/User')
const Department = require('../Model/Department')
const Message = require('../Model/Message')

const userController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        createAt: user.createdAt,
        from: user.from,
        messages: user.messages,
      })
    } else {
      res.status(401)
      throw new Error('Mật khẩu hoặc email không đúng!')
    }
  }),
  addUser: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, from } = req.body
      const userExit = await User.findOne({ email })
      if (userExit) {
        throw Error('Địa chỉ email đã tồn tại!!')
      }
      const user = await User.create({
        name,
        email,
        password,
        from,
      })
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
        })
        await Department.updateOne({ _id: from }, { $push: { users: user._id } })
        await Message.create({
          idUser: user._id,
        })
      }
    } catch (err) {
      throw new Error(err)
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    try {
      const user = await User.find({ role: { $lt: 1 } }).populate({ path: 'from', select: 'name' })
      res.status(200).json(user)
    } catch (err) {
      throw new Error(error)
    }
  }),
  edit: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const { name } = req.body
    if (user) {
      user.name = name || user.name
      const updatedUser = await user.save()
      res.status(200).json(updatedUser)
    } else {
      res.status(400)
      throw new Error('Không tìm thấy user')
    }
  }),
  get: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('from name')
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  }),
  deleteUser: asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id
      await User.deleteOne({ _id: userId })
      await Department.updateOne({ $pull: { users: userId } })

      res.status(204).json({ message: 'Xóa người dùng thành công!' })
    } catch (err) {
      res.status(401).json(err)
    }
  }),
}

module.exports = userController
