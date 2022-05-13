const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'only a valid user can make a post'],
  },
  caption: String,
  images: {
    type: String,
    default: 'no-image.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  nLikes: {
    type: Number,
    default: 0,
  },
  nComments: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
