const express = require('express');
const authController = require('./../controllers/authController');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

router.route('/').get(ticketController.getAllTickets);

router.use(authController.protect);

router
  .route('/statsAvg')
  .get(
    authController.restrictTo('moderator', 'admin'),
    ticketController.getAvgStatsTickets
  );

router
  .route('/statsMovie')
  .get(
    authController.restrictTo('moderator', 'admin'),
    ticketController.getMovieStatsTickets
  );

router
  .route('/my')
  .get(ticketController.setUserId, ticketController.getAllTickets);
router.route('/:id').get(ticketController.getTicket);

router.get('/checkout-session/:id', ticketController.getCheckoutSession);

router
  .route('/')
  .post(ticketController.setUserId, ticketController.createTicket);

module.exports = router;
