const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  role: {type: String, enum: ["staff", "admin", "manager"], required: true},
  lastLogin: {type: Date},
  createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("User", userSchema);
