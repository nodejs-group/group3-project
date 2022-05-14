const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

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
  try {
    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user.id,
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
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId });
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

exports.likeAPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.nLikes++;
    post.save();
    res.status(200).json({
      status: 'success',
      message: 'post liked successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getAllLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json({ status: 'ok', likes: post.nLikes });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
