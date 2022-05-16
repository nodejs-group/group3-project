const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// Create new post
exports.newPost = async (req, res) => {
  try {
    const post = await Post.create({
      caption: req.body.caption,
      user: req.user.id,
    });
    res.status(200).json({
      status: 'success',
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Fetch all posts from database
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      status: 'success',
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.addComment = async (req, res) => {
  console.log(req.body);
  try {
    const comment = await Comment.create({
      post: req.params.postid,
      user: req.body.user,
      comment: req.body.comment,
    });
    res.status(200).json({
      status: 'success',
      comment,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getCommentsOnPost = async (req, res) => {
  try {
    const { postid } = req.params;
    const comments = await Comment.find({ post: postid });
    res.status(200).json({
      status: 'success',
      comments,
    });
  } catch (err) {
    res.status(err.status).json({
      status: 'error',
      error: err.message,
    });
  }
};
