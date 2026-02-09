const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({

  name: {type: String, required: true, unique: true},

  symbol: {type: String},

  description: {type: String},

  createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Metric", metricSchema);
