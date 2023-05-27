const Bar = require('../models/barModel');
const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const CloudinaryStorage = require('../utils/cloudinary');

exports.getAllBars = factory.getAll(Bar);
exports.getBar = factory.getOne(Bar);
exports.createBar = factory.createOne(Bar);
exports.updateBar = factory.updateOne(Bar);
exports.deleteBar = factory.deleteOne(Bar);
exports.checkToDeleteBar = factory.checkToDelete(Ticket, 'barOrders.bar');

exports.uploadBarPhoto = (req, res, next) => {
  const upload = CloudinaryStorage.createSingle(
    'imageCover',
    'Bar',
    req.params.id,
    215,
    215
  );

  upload(req, res, err => {
    if (err) return next(err);

    if (req.file) req.body.imageCover = req.file.path;
    next();
  });
};

exports.deleteBarPhoto = (req, res, next) => {
  CloudinaryStorage.deleteSingle('Bar', req.params.id);
  next();
};
