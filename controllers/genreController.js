const Genre = require('../models/genreModel');
const factory = require('./handlerFactory');

exports.getAllGenres = factory.getAll(Genre);
exports.getGenre = factory.getOne(Genre, { path: 'movies' });
exports.createGenre = factory.createOne(Genre);
exports.updateGenre = factory.updateOne(Genre);
exports.deleteGenre = factory.deleteOne(Genre);
