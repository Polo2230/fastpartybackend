const mongoose = require("mongoose");
const { Schema } = mongoose; // Extrae Schema de mongoose

const DiscountSchema = new Schema({
  name: String,
  percentage: Number, // Porcentaje de descuento
  validFrom: Date,
  validUntil: Date,
  minCustomerAge: { type: Number, default: 365 }, // Días desde el registro
  appliesTo: [{ type: Schema.Types.ObjectId, ref: "Event" }], // Eventos a los que aplica
});

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
