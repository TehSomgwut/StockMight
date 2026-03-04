const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

  product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},    
  type: {type: String, enum: ["import", "export"], required: true},
  quantity: {type: Number, required: true},
  previous: {type: Number},
  current: Number,
  note: String,
  reason: String,

  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Transaction", transactionSchema);
