const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose)
const timestamp = require('mongoose-timestamp');
const Comment = require("./Comment")

const pizzaSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  toppings: [{
      type: String,
      required: true
  }],
  price: {
      small: {
          type: Number,
          required: true
      },
      large: {
          type: Number,
          required: true
      }
  },
  vegan: {
      type: Boolean,
      required: true
  },
  imageUrl: {
      type: String,
      required: true,
      match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
  }]
});

pizzaSchema.plugin(AutoIncrement, {
    inc_field: "id",
    id: "pizzaNums",
    start_seq: 1,
  });
  

pizzaSchema.plugin(timestamp);

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;