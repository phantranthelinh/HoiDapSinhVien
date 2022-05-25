
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../Model/User")
const userController = {
  addUser: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, role,group } = req.body;
      const userExit = await User.findOne({ email });
      if (userExit) {
        res.status(400).json("Email đã tồn tại!!!");
      }
      const user = await User.create({
        name,
        email,
        role,
        password,
        group
      });
      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
          group: user.group
        });
    }
    } catch (err) {
      throw new Error("Thêm mới user thất bại!!!");
    }
  }),
  getUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  }),
  deleteUser: asyncHandler(async (req, res) => {}),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  }),
};
module.exports = userController;