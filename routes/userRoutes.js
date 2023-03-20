const express = require("express");
const userController = require("./../controllers/userController");
// const authController = require('./../controllers/authController');

const router = express.Router();

// router.post('/signup', userController.signup);
// router.post('/login', userController.login);
// router.get('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', userController.resetPassword);

// router.use(authController.protect);

// router.patch('/updateMyPassword', userController.updatePassword);
// router.get('/me', userController.getMe, userController.getUser);
// router.patch('/updateMe', userController.updateMe);
// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;
