const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productName:{type:String},
  productPrice:{type:Number},
  productCount:{type:Number},
});

module.exports=mongoose.model("Order",orderSchema,"Order")
