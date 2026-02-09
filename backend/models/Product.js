const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {type: String, required: true},
  code: {type: String, unique: true},
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  unit: {type: String},
  quantity: {type: Number, default: 0},
  minStock: {type: Number, default: 10},

  createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Product", productSchema);