const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  name: {type: String, required: true, unique: true},
  description: String,
  status: {type: String, enum: ["active", "inactive"]},

  createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Category", categorySchema);
