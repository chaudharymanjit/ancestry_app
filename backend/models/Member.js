const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  birthCity: { type: String, required: true },
  Address: { type: String, required: true },
  relationship: { type: String, required: true },
  rootId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
