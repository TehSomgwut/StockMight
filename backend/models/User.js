const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  userId: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: ["staff", "admin", "manager"], required: true},

  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User", userSchema);
