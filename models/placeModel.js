const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  }
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
