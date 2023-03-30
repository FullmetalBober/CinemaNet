const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  orders: [
    {
      bar: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bar',
        required: [true, 'Order must have a bar'],
      },
      count: {
        type: Number,
        required: [true, 'Order must have a count'],
      },
    },
  ],
  tickets: [
    {
      ticket: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ticket',
        required: [true, 'Order must have a ticket'],
      },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
