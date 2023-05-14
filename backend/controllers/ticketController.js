const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllTickets = factory.getAll(Ticket);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id).populate([
    {
      path: 'showtime',
      populate: {
        path: 'hall',
        select: 'name price cinema seats',
        populate: {
          path: 'cinema',
          select: 'name location.city',
        },
      },
    },
    {
      path: 'user barOrders.bar',
      select: 'name email price',
    },
  ]);

  const priceSeats = Math.round(
    ticket.seats.reduce((acc, el) => {
      const isLux = el.row > ticket.showtime.hall.seats.standard.length;
      const priceHall = isLux
        ? ticket.showtime.hall.price.lux
        : ticket.showtime.hall.price.standard;
      return priceHall + ticket.showtime.movie.price + acc;
    }, 0) * 100
  );

  const imgUrl = ticket.showtime.movie.imageCover.startsWith('http')
    ? ticket.showtime.movie.imageCover
    : `${req.protocol}://${req.get('host')}/${
        ticket.showtime.movie.imageCover
      }`;

  const host = req.get('host').includes('localhost')
    ? 'localhost:3000'
    : req.get('host');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${host}/me`,
    cancel_url: `${req.protocol}://${host}/showtime/${ticket.showtime._id}`,
    customer_email: ticket.user.email,
    client_reference_id: req.params.id,
    mode: 'payment',
    expires_at: Math.floor(ticket.booking.getTime() / 1000) + 30 * 60,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: priceSeats,
          product_data: {
            name: ticket.showtime.movie.name,
            description: `${ticket.showtime.hall.cinema.name} - №${ticket.showtime.hall.name}`,
            images: [imgUrl],
          },
        },
      },
      // {
      //   name: 'Bar Order',
      //   description: ticket.barOrders.map(el => el.bar.name).join(', '),
      //   amount: ticket.barOrders.reduce((acc, el) => acc + el.price, 0) * 100,
      //   currency: 'usd',
      //   quantity: 1,
      // },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.webhookCheckout = (req, res, next) => {};
