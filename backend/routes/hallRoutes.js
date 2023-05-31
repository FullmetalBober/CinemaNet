const express = require('express');
const authController = require('./../controllers/authController');
const hallController = require('./../controllers/hallController');

const router = express.Router();

router.route('/').get(hallController.regexSearch, hallController.getAllHalls);
router.route('/:id').get(hallController.getHall);

router.use(authController.protect);
router.use(authController.restrictTo('moderator', 'admin'));

router.route('/').post(hallController.createHall);

router
  .route('/:id')
  .patch(hallController.updateHall)
  .delete(hallController.checkToDeleteHall, hallController.deleteHall);

module.exports = router;
