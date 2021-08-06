const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    fullname: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
}, {
  timestamps: false,
});

const productSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    id: { type: String, required: true },
    store: { type: String, required: true },
}, {
  timestamps: false,
});
const orderSchema = new Schema({
    store: { type: String, required: true },
    buyer: { type: String, required: false },
    status: { type: String, required: true },
    product: [productSchema],
    address: [addressSchema]
}, {
  timestamps: true,
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;