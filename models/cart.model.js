const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productid: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    username: { type: String, required: true },
    store: { type: String, required: true },
    status: { type: String, required: true },
  }, {
    timestamps: true,
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;