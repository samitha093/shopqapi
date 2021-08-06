const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    status: { type: String, required: true },
    store: { type: String, required: true },
}, {
  timestamps: true,
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;