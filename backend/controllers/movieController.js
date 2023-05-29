const Movie = require('../models/movieModel');
const Showtime = require('../models/showtimeModel');
const factory = require('./handlerFactory');
const CloudinaryStorage = require('../utils/cloudinary');

const uploadOptions = {
  key: 'imageCover',
  width: 250,
  height: 369,
};

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
exports.checkToDeleteMovie = factory.checkToDelete(Showtime, 'movie');

exports.uploadMoviePhoto = (req, res, next) => {
  const upload = CloudinaryStorage.createSingle(
    uploadOptions.key,
    'Movie',
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

exports.deleteMoviePhoto = (req, res, next) => {
  CloudinaryStorage.deleteSingle('Movie', req.params.id);
  next();
};

exports.regexSearch = (req, res, next) => {
  if (req.query.search) {
    req.query.name = { $regex: req.query.search, $options: 'i' };
    req.query.search = undefined;
  }

  next();
};
