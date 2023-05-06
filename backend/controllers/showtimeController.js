const Showtime = require('../models/showtimeModel');
const factory = require('./handlerFactory');

exports.getAllShowtimes = factory.getAll(Showtime, {
  path: 'hall',
  select: 'name price',
});
exports.getShowtime = factory.getOne(Showtime, [
  {
    path: 'hall',
    select: 'name price cinema seats',
    populate: {
      path: 'cinema',
      select: 'name location.city',
    },
  },
  {
    path: 'tickets',
    select: 'seats',
  },
]);
exports.createShowtime = factory.createOne(Showtime);
exports.updateShowtime = factory.updateOne(Showtime);
exports.deleteShowtime = factory.deleteOne(Showtime);

// exports.checkShowtime = catchAsync(async (req, res, next) => {
//   if (!req.body.time.end) {
//     const movie = await Movie.findById(req.body.movie);
//     req.body.time.end = new Date(req.body.time.start);
//     req.body.time.end.setMinutes(
//       req.body.time.end.getMinutes() + movie.duration
//     );
//   }

//   const showtime = await Showtime.findOne({
//     hall: req.body.hall,
//     $or: [
//       // [ ] - another showtime
//       // | | - this showtime
//       {
//         // [ || ]
//         'time.start': { $gte: req.body.time.start },
//         'time.end': { $lte: req.body.time.end },
//       },
//       {
//         // | [] |
//         'time.start': { $lte: req.body.time.start },
//         'time.end': { $gte: req.body.time.end },
//       },
//       {
//         // [ | ] |
//         'time.start': { $gte: req.body.time.start },
//         'time.start': { $lte: req.body.time.end },
//       },
//       {
//         // | [ | ]
//         'time.end': { $gte: req.body.time.start },
//         'time.end': { $lte: req.body.time.end },
//       },
//     ],
//   });

//   if (showtime) {
//     return next(
//       new AppError('This hall is already occupied at this time', 400)
//     );
//   }

//   next();
// });
