const express = require('express');
const authController = require('./../controllers/authController');
const barController = require('./../controllers/barController');

const router = express.Router();

router.route('/').get(barController.regexSearch, barController.getAllBars);
router.route('/:id').get(barController.getBar);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(barController.createBar);

router
  .route('/:id')
  .patch(barController.uploadBarPhoto, barController.updateBar)
  .delete(
    barController.checkToDeleteBar,
    barController.deleteBarPhoto,
    barController.deleteBar
  );

module.exports = router;
