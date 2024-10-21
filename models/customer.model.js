const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    identification: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    registrationDate: { type: Date, default: Date.now }, 
    discountEligibility: { type: Boolean, default: false }, 
    
  },
  { timestamps: true }
);

CustomerSchema.methods.checkDiscountEligibility = function () {
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // Milisegundos en un año
  const timeSinceRegistration = Date.now() - this.registrationDate.getTime();
  
  if (timeSinceRegistration > oneYearInMs) {
    this.discountEligibility = true;
  }
  return this.discountEligibility;
};



module.exports = mongoose.model("Customer", CustomerSchema);
