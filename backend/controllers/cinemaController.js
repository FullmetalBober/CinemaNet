const Cinema = require('../models/cinemaModel');
const factory = require('./handlerFactory');

exports.getAllCinemas = factory.getAll(Cinema);
exports.getCinema = factory.getOne(Cinema);
exports.createCinema = factory.createOne(Cinema);
exports.updateCinema = factory.updateOne(Cinema);
exports.deleteCinema = factory.deleteOne(Cinema);
