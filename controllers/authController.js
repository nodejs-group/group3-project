const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const createSendToken = (user, statusCode, res) => {};

exports.registerUser = async (req, res) => {
  console.log('registerUser called');
  try {
    //create new user
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordMatch: req.body.passwordMatch,
    });
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (
      !user ||
      !(await user.checkPassword(req.body.password, user.password))
    ) {
      res.status(401).json({
        status: 'error',
        message: 'user not found',
      });
    }
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
