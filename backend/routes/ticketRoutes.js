const express = require('express');
const authController = require('./../controllers/authController');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

router.route('/').get(ticketController.getAllTickets);
router.route('/:id').get(ticketController.getTicket);

router.use(authController.protect);

router.get('/checkout-session/:id', ticketController.getCheckoutSession);

router
  .route('/')
  .post(ticketController.setUserId, ticketController.createTicket);

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
