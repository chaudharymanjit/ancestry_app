const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  birthCity: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
