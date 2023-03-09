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
  flour: {
    type: String,
    required: true
  },
  gluten: {
      type: Boolean,
      required: true
  },
  instructions: {
    type: String,
    required: true
  },
  imageUrl: {
      type: String,
      required: true,
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: true
  }]
});

pizzaSchema.plugin(AutoIncrement, {
    inc_field: "id",
    id: "pizzaNums",
    start_seq: 1,
  });
  

pizzaSchema.plugin(timestamp);
pizzaSchema.plugin(require('mongoose-autopopulate'));

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;