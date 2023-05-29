const Bar = require('../models/barModel');
const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const CloudinaryStorage = require('../utils/cloudinary');

const uploadOptions = {
  key: 'imageCover',
  width: 215,
  height: 215,
};

exports.getAllBars = factory.getAll(Bar);
exports.getBar = factory.getOne(Bar);
exports.createBar = factory.createOne(Bar);
exports.updateBar = factory.updateOne(Bar);
exports.deleteBar = factory.deleteOne(Bar);
exports.checkToDeleteBar = factory.checkToDelete(Ticket, 'barOrders.bar');

exports.uploadBarPhoto = (req, res, next) => {
  const upload = CloudinaryStorage.createSingle(
    uploadOptions.key,
    'Bar',
    req.params.id,
    uploadOptions.width,
    uploadOptions.height
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

exports.regexSearch = (req, res, next) => {
  if (req.query.search) {
    req.query.name = { $regex: req.query.search, $options: 'i' };
    req.query.search = undefined;
  }

  next();
};
