const Movie = require('../models/movieModel');
const factory = require('./handlerFactory');
const CloudinaryStorage = require('../utils/cloudinary');

const popOptions = {
  path: 'genres',
  select: 'name _id slug',
};

exports.getAllMovies = factory.getAll(Movie);
exports.getMovie = factory.getOne(Movie, popOptions);
exports.getMovieBySlug = factory.getOneBySlug(Movie, popOptions);
exports.createMovie = factory.createOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);

exports.uploadMoviePhoto = (req, res, next) => {
  const upload = CloudinaryStorage.createSingle(
    'imageCover',
    'Movie',
    req.params.id,
    250,
    369
  );

  upload(req, res, err => {
    if (err) return next(err);

    if (req.file) req.body.imageCover = req.file.path;
    next();
  });
};

exports.deleteMoviePhoto = (req, res, next) => {
  CloudinaryStorage.deleteSingle('Movie', req.params.id);
  next();
};
