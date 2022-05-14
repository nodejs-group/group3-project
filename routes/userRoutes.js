const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/me')
  .put(authController.validateUser, userController.updateUser)
  .delete(authController.validateUser, userController.deleteUser)
  .get(authController.validateUser, userController.getMe);

router.get('/:id', userController.getUser);

router.route('/:id/follow').put(userController.followUser);

router.route('/:id/unfollow').put(userController.unfollowUser);

module.exports = router;
