const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../Model/User')
const userController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        createAt: user.createdAt,
      })
      req.user = user
    } else {
      res.status(401)
      throw new Error('Invalid Email or Password')
    }
  }),
  addUser: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, role } = req.body
      const userExit = await User.findOne({ email })
      if (userExit) {
        res.status(400).json('Email đã tồn tại!!!')
      }
      const user = await User.create({
        name,
        email,
        role,
        password,
      })
      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
        })
      }
    } catch (err) {
      throw new Error('Thêm mới user thất bại!!!')
    }
  }),
  getUser: asyncHandler(async (req, res) => {
    try {
      const user = await User.find({})
      res.status(200).json(user)
    } catch (err) {
      throw new Error(error)
    }
  }),
  deleteUser: asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id
      await User.deleteOne({ _id: userId })
      res.status(200).json('Xóa người dùng thành công!')
    } catch (err) {
      res.status(401).json(err)
    }
  }),
}

module.exports = userController
