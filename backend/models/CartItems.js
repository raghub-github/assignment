const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", },
  amount: { type: Number },
  color: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
  company: { type: String },
  max: { type: Number },
  name: { type: String },
  _pid: { type: Object },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("cart", CartSchema);
