const Genre = require('../models/genreModel');
const factory = require('./handlerFactory');
const CloudinaryStorage = require('../utils/cloudinary');

exports.getAllGenres = factory.getAll(Genre);
exports.getGenre = factory.getOne(Genre, { path: 'movies', select: 'name imageCover trailer _id' });
exports.createGenre = factory.createOne(Genre);
exports.updateGenre = factory.updateOne(Genre);
exports.deleteGenre = factory.deleteOne(Genre);

exports.uploadGenrePhoto = (req, res, next) => {
    const upload = CloudinaryStorage.createSingle(
      'imageCover',
      'Genre',
      req.params.id,
      1024,
      704
    );
  
    upload(req, res, err => {
      if (err) return next(err);
  
      if (req.file) req.body.imageCover = req.file.path;
      next();
    });
  };
  
  exports.deleteGenrePhoto = (req, res, next) => {
    CloudinaryStorage.deleteSingle('Genre', req.params.id);
    next();
  };