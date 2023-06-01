const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTickets = factory.getAll(Ticket, [
  {
    path: 'showtime',
    select: 'time hall',
    populate: {
      path: 'hall',
      select: 'name cinema',
      populate: {
        path: 'cinema',
        select: 'name',
      },
    },
  },
  {
    path: 'barOrders.bar',
    select: 'name',
  },
]);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  req.query.user = req.user.id;
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
      cost: event.data.object.amount_total / 100,
    });

  res.status(200).json({ received: true });
});

const avg = (cond, field) => ({
  $avg: {
    $cond: [cond, field, 0],
  },
});
const thisYear = { $eq: [{ $year: '$createdAt' }, { $year: new Date() }] };
const thisMonth = {
  $and: [
    { $eq: [{ $month: '$createdAt' }, { $month: new Date() }] },
    { $eq: [{ $year: '$createdAt' }, { $year: new Date() }] },
  ],
};
const thisWeek = {
  $and: [
    { $eq: [{ $week: '$createdAt' }, { $week: new Date() }] },
    { $eq: [{ $year: '$createdAt' }, { $year: new Date() }] },
  ],
};

const thisDay = {
  $and: [
    { $eq: [{ $dayOfYear: '$createdAt' }, { $dayOfYear: new Date() }] },
    { $eq: [{ $year: '$createdAt' }, { $year: new Date() }] },
  ],
};
const seats = { $size: '$seats' };

exports.getAvgStatsTickets = catchAsync(async (req, res, next) => {
  const cost = '$cost';
  const barOrders = { $sum: '$barOrders.count' };
  const stats = await Ticket.aggregate([
    {
      $group: {
        _id: null,
        price: { $avg: cost },
        seats: { $avg: seats },
        barOrders: { $avg: barOrders },
        priceThisYear: avg(thisYear, cost),
        seatsThisYear: avg(thisYear, seats),
        barOrdersThisYear: avg(thisYear, barOrders),
        priceThisMonth: avg(thisMonth, cost),
        seatsThisMonth: avg(thisMonth, seats),
        barOrdersThisMonth: avg(thisMonth, barOrders),
        priceThisWeek: avg(thisWeek, cost),
        seatsThisWeek: avg(thisWeek, seats),
        barOrdersThisWeek: avg(thisWeek, barOrders),
        priceThisDay: avg(thisDay, cost),
        seatsThisDay: avg(thisDay, seats),
        barOrdersThisDay: avg(thisDay, barOrders),
      },
    },
    {
      $addFields: {
        price: { $round: ['$price', 2] },
        priceThisYear: { $round: ['$priceThisYear', 2] },
        priceThisMonth: { $round: ['$priceThisMonth', 2] },
        priceThisWeek: { $round: ['$priceThisWeek', 2] },
        priceThisDay: { $round: ['$priceThisDay', 2] },
        seats: { $round: ['$seats', 2] },
        seatsThisYear: { $round: ['$seatsThisYear', 2] },
        seatsThisMonth: { $round: ['$seatsThisMonth', 2] },
        seatsThisWeek: { $round: ['$seatsThisWeek', 2] },
        seatsThisDay: { $round: ['$seatsThisDay', 2] },
        barOrders: { $round: ['$barOrders', 2] },
        barOrdersThisYear: { $round: ['$barOrdersThisYear', 2] },
        barOrdersThisMonth: { $round: ['$barOrdersThisMonth', 2] },
        barOrdersThisWeek: { $round: ['$barOrdersThisWeek', 2] },
        barOrdersThisDay: { $round: ['$barOrdersThisDay', 2] },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMovieStatsTickets = catchAsync(async (req, res, next) => {
  const stats = await Ticket.aggregate([
    {
      $lookup: {
        from: 'showtimes',
        localField: 'showtime',
        foreignField: '_id',
        as: 'showtime',
      },
    },
    {
      $unwind: '$showtime',
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'showtime.movie',
        foreignField: '_id',
        as: 'showtime.movie',
      },
    },
    {
      $unwind: '$showtime.movie',
    },
    {
      $group: {
        _id: '$showtime.movie',
        count: { $sum: seats },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $facet: {
        mostPopular: [{ $limit: 1 }],
        leastPopular: [{ $sort: { count: 1 } }, { $limit: 1 }],
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
