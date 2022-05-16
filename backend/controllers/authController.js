const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  // generating jwt token
  const token = signToken(user._id);

  // sending jwt token as cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // sending response to client
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

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

    createSendToken(user, 201, res);
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
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};
exports.validateUser = async (req, res, next) => {
  try {
    // 1) getting token and checking if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token) return new Error('you are not logged in..please login first');
    // 2) verifacatiom of tokens
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    // 3) check if user still exists
    const currentUser = await User.findById(decodedToken.id);
    if (!currentUser) {
      return new Error('the user belonging to this token does not exist');
    }
    // 4) check if user changed password after token has issued
    // if (currentUser.changedPassword(decodedToken.iat))
    //   return next(
    //     new AppError('User password has changed...please login again', 401)
    //   );

    req.user = currentUser;
    //GRANT ACCESS TO PROTECTED ROUTES
    next();
  } catch (err) {
    res.status(403).json({ status: 'error', message: err.message });
  }
};
