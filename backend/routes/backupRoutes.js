const express = require('express');
const authController = require('./../controllers/authController');
const backupController = require('./../controllers/backupController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').get(backupController.getBackup);

module.exports = router;
