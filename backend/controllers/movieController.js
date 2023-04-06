const Movie = require('../models/movieModel');
const factory = require('./handlerFactory');

exports.getAllMovies = factory.getAll(Movie);
exports.getMovie = factory.getOne(Movie, { path: 'genres', select: 'name _id slug' });
exports.createMovie = factory.createOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);
