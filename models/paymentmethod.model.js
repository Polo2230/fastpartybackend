const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
