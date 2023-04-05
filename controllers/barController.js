const Bar = require('../models/barModel');
const factory = require('./handlerFactory');

exports.getAllBars = factory.getAll(Bar);
exports.getBar = factory.getOne(Bar);
exports.createBar = factory.createOne(Bar);
exports.updateBar = factory.updateOne(Bar);
exports.deleteBar = factory.deleteOne(Bar);
