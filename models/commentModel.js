const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Comment cannot be empty'],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, "you can't post a comment without an post..."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Only a user can post a comment...'],
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username profilePicture',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
