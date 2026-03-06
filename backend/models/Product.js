const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {type: String, required: true},
  code: {type: String, unique: true},
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  metric: {type: mongoose.Schema.Types.ObjectId, ref: "Metric"},
  quantity: {type: Number, default: 0},
  minStock: {type: Number, default: 10},
  image: {type: String, default: "/"},
  MFG: {type: Date, default: Date.now},
  EXP: {type: Date},
  clearStock: {type: Date, default: () => Date.now() + 365 * 24 * 60 * 60 * 1000 * 10},
  status: {type: String, Enum: ["active", "inactive"]},
  createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Product", productSchema);