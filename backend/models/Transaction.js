const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

  product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},    
  type: {type: String, enum: ["in", "out"], required: true},
  quantity: {type: Number, required: true},
  note: String,

  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Transaction", transactionSchema);
