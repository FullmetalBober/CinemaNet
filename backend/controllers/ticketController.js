const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTickets = factory.getAll(Ticket);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

const getImageUrl = (req, el) => {
  return el.startsWith('http')
    ? el
    : `${req.protocol}://${req.get('host')}/${el}`;
};

const createSessionLine = (req, name, quantity, unit_amount, image) => {
  return {
    quantity,
    price_data: {
      currency: 'usd',
      unit_amount: Math.round(unit_amount * 100),
      product_data: {
        name,
        images: [getImageUrl(req, image)],
      },
    },
  };
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
      select: 'name email price imageCover',
    },
  ]);

  const seatLines = ticket.seats.map(el => {
    const isLux = el.row > ticket.showtime.hall.seats.standard.length;
    const priceHall = isLux
      ? ticket.showtime.hall.price.lux
      : ticket.showtime.hall.price.standard;

    return createSessionLine(
      req,
      `${ticket.showtime.hall.cinema.name} - ${ticket.showtime.movie.name} - Row ${el.row} - Seat ${el.col}`,
      1,
      priceHall + ticket.showtime.movie.price,
      ticket.showtime.movie.imageCover
    );
  });

  const barLines = ticket.barOrders.map(el => {
    return createSessionLine(
      req,
      el.bar.name,
      el.count,
      el.bar.price,
      el.bar.imageCover
    );
  });

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
    expires_at: Math.floor(ticket.booking.getTime() / 1000) + 31 * 60,
    line_items: [...seatLines, ...barLines],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return next(new AppError(`Webhook error: ${err}`, 400));
  }

  if (event.type === 'checkout.session.completed')
    await Ticket.findByIdAndUpdate(event.data.object.client_reference_id, {
      booking: null,
    });

  res.status(200).json({ received: true });
});
