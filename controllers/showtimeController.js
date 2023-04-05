const Showtime = require('../models/showtimeModel');
const factory = require('./handlerFactory');

exports.getAllShowtimes = factory.getAll(Showtime);
exports.getShowtime = factory.getOne(Showtime);
exports.createShowtime = factory.createOne(Showtime);
exports.updateShowtime = factory.updateOne(Showtime);
exports.deleteShowtime = factory.deleteOne(Showtime);
