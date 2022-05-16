const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser);

router.route('/:id/follow').put(userController.followUser);

router.route('/:id/unfollow').put(userController.unfollowUser);

module.exports = router;
