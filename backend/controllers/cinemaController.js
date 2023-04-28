const CloudinaryStorage = require('../utils/cloudinary');
const Cinema = require('../models/cinemaModel');
const factory = require('./handlerFactory');

exports.getAllCinemas = factory.getAll(Cinema);
exports.getCinema = factory.getOne(Cinema);
exports.createCinema = factory.createOne(Cinema);
exports.updateCinema = factory.updateOne(Cinema);
exports.deleteCinema = factory.deleteOne(Cinema);

exports.uploadCinemaPhoto = (req, res, next) => {
  const upload = CloudinaryStorage('Cinema', req.params.id, 1880, 780);

  upload(req, res, err => {
    if (err) return next(err);

    if (req.file) req.body.imageCover = req.file.path;
    next();
  });
};
