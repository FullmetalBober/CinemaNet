const express = require('express');
const authController = require('./../controllers/authController');
const showtimeController = require('./../controllers/showtimeController');

const router = express.Router();

router.route('/').get(showtimeController.getAllShowtimes);
router.route('/:id').get(showtimeController.getShowtime);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(showtimeController.createShowtime);

router
  .route('/:id')
  .patch(showtimeController.updateShowtime)
  .delete(showtimeController.deleteShowtime);

module.exports = router;
