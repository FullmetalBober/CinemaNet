const Hall = require('../models/hallModel');
const Showtime = require('../models/showtimeModel');
const factory = require('./handlerFactory');

exports.getAllHalls = factory.getAll(Hall);
exports.getHall = factory.getOne(Hall);
exports.createHall = factory.createOne(Hall);
exports.updateHall = factory.updateOne(Hall);
exports.deleteHall = factory.deleteOne(Hall);
exports.checkToDeleteHall = factory.checkToDelete(Showtime, 'hall');

exports.regexSearch = (req, res, next) => {
  if (req.query.search) {
    req.query.name = { $regex: req.query.search, $options: 'i' };
    req.query.search = undefined;
  }

  next();
};
