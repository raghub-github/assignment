const mongoose = require('mongoose');
const bwipjs = require('bwip-js');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean, required: false },
  rating: { type: Number, default: 4.3 },
  createdAt: { type: Date, default: Date.now() },
  category: { type: String, required: true },
  colors: { type: Array, required: false },
  image: { type: Array, required: true },
  description: { type: String, required: false },
  stock: { type: Number, required: true },
  reviews: { type: Number, required: true, default: 99 },
  company: { type: String, required: true },
  barcode: { type: String, required: false, unique: true }
});

productSchema.pre('save', async function (next) {
  try {
    if (!this.barcode) {
    const barcodeData = `${this.name} ${this.price} ${this.category} ${this.company}`;
    const buffer = await bwipjs.toBuffer({
      bcid: 'code128',
      text: barcodeData,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    });

    this.barcode = `data:image/png;base64,${buffer.toString('base64')}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Product', productSchema);