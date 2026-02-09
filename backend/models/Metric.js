const mongoose = require("mongoose");

  name: {type: String, required: true, unique: true},

  symbol: {type: String},

  description: {type: String},

  createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Metric", metricSchema);
