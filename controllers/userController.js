const User = require('../models/userModel');

//update user
exports.updateUser = async (req, res) => {
  // 1) don't allow password updates
  if (req.body.password || req.body.passwordMatch)
    return new Error('updating password not allowed.. visit /resetMyPassword');

  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      runValidators: true,
      new: true,
    });
    res
      .status(200)
      .json({ status: 'success', message: 'Account has been updated' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res
      .status(200)
      .json({ status: 'success', message: 'Account has been deleted' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json({ status: 'success', user });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
};

//get a user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json({ status: 'success', user });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
};

exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({
          status: 'success',
          message: 'user has been followed!',
        });
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
};

//unfollow a user
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res
          .status(200)
          .json({ status: 'success', message: 'user has been unfollowed' });
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
};
