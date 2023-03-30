const Genre = require('../models/genreModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAllGenres = factory.getAll(Genre);
exports.getGenre = factory.getOne(Genre, { path: 'movies' });
exports.createGenre = factory.createOne(Genre);
exports.updateGenre = factory.updateOne(Genre);
exports.deleteGenre = factory.deleteOne(Genre);
