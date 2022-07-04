var jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')

const User = require('../Model/User')

const protect = asyncHandler(async (req, res, next) => {
  var token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      console.error(err)
      res.status(401)
      throw new Error('Not authorized , token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
const ROLE_ADMIN = 1

const admin = (req, res, next) => {
  if (req.user && req.user.role === ROLE_ADMIN) {
    next()
  } else {
    res.status(401)
    throw new Error('Bạn không có quyền truy cập')
  }
}

module.exports = { protect, admin }