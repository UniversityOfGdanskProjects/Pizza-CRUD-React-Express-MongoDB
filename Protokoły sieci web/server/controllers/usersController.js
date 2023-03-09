const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  
  const users = await User.find({}, { password: 0 }).lean().exec();

  if (!users?.length) {
    return res.status(400).json({ message: "Bad request, no users found." });
  }
  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await User.findOne({ username: username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Username is already taken" });
  }

  const hashedPsswd = await bcrypt.hash(password, 10);

  const userObject = {
    username: username,
    password: hashedPsswd,
    roles: ["user"]
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Couldn't create a new user" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  
  const { id, username, password } = req.body;

  if (!id || !username) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  const user = await User.findOne({ _id: id }).exec();

  console.log(user)

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Username is already taken" });
  }

  user.username = username;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${user.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

  const { id } = req.body;

  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await User.findOne({ _id: id }).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await User.deleteOne(user)

  const resultMsg = `Username: ${user.username} with ID: ${user._id} has been deleted`

  res.json(resultMsg)
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
