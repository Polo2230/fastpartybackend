const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    isExclusive: { type: Boolean, default: false }, 
    discount: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
