const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');

exports.getAllTickets = factory.getAll(Ticket);
exports.getTicket = factory.getOne(Ticket);
exports.createTicket = factory.createOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};
