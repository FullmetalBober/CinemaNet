const express = require('express');
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController');

const router = express.Router();

router.route('/').get(orderController.getAllOrders);
router.route('/:id').get(orderController.getOrder);

router.use(authController.protect);

router.route('/').post(orderController.createOrder);

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
