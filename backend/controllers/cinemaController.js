const CloudinaryStorage = require('../utils/cloudinary');
const Cinema = require('../models/cinemaModel');
const Hall = require('../models/hallModel');
const Bar = require('../models/barModel');
const factory = require('./handlerFactory');

exports.getAllCinemas = factory.getAll(Cinema);
exports.getCinema = factory.getOne(Cinema);
exports.createCinema = factory.createOne(Cinema);
exports.updateCinema = factory.updateOne(Cinema);
exports.deleteCinema = factory.deleteOne(Cinema);
exports.checkToDeleteCinema = factory.checkToDelete([Hall, Bar], 'cinema');

exports.uploadCinemaPhoto = (req, res, next) => {
  const upload = CloudinaryStorage.createSingle(
    'imageCover',
    'Cinema',
    req.params.id,
    1880,
    780
  );

  upload(req, res, err => {
    if (err) return next(err);

    if (req.file) req.body.imageCover = req.file.path;
    next();
  });
};

exports.deleteCinemaPhoto = (req, res, next) => {
  CloudinaryStorage.deleteSingle('Cinema', req.params.id);
  next();
};
