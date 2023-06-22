const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productName: { type: String },
  productPrice: { type: Number },
  img: { type: String },
});

module.exports = mongoose.model("Product", orderSchema, "Product");
