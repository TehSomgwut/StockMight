const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  realname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  role: {type: String, enum: ["staff", "admin", "manager"], required: true},
  lastLogin: {type: Date},
  createdAt: {type: Date, default: Date.now},
  status: {type: String, enum: ["ใช้งาน", "ปิดการใช้งาน"]}

});

module.exports = mongoose.model("User", userSchema);
