const express = require('express');
const authController = require('../controllers/authController');
const cinemaController = require('./../controllers/cinemaController');

const router = express.Router();

router.route('/').get(cinemaController.getAllCinemas);
router.route('/:id').get(cinemaController.getCinema);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(cinemaController.createCinema);

router
  .route('/:id')
  .patch(cinemaController.updateCinema)
  .delete(cinemaController.deleteCinema);

module.exports = router;
