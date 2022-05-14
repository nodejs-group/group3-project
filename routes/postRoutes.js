const express = require('express');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.validateUser, postController.newPost)
  .get(postController.getAllPosts);

router
  .route('/:postId/comments')
  .get(postController.getCommentsOnPost)
  .post(authController.validateUser, postController.addComment);
module.exports = router;

router
  .route('/:postId/likes')
  .post(postController.likeAPost)
  .get(postController.getAllLikes);
