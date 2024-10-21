const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  price: { type: Number, required: true },
  qrCode: { type: String },
  status: { type: String, default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
