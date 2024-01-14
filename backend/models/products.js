const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean, required: false },
  rating: { type: Number, default: 4.3 },
  createdAt: { type: Date, default: Date.now() },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
  stock: { type: Number, required: true },
  reviews: { type: Number, required: true, default: 99 }
});

module.exports = mongoose.model('Product', productSchema);