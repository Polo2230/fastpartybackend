const Discount = require("../models/discount.model");
const Event = require("../models/event.model");

// Crear un nuevo descuento
exports.createDiscount = async (req, res) => {
  try {
    const { name, percentage, validFrom, validUntil, minCustomerAge, appliesTo } = req.body;

    const newDiscount = new Discount({
      name,
      percentage,
      validFrom,
      validUntil,
      minCustomerAge,
      appliesTo
    });

    const savedDiscount = await newDiscount.save();
    res.status(201).json(savedDiscount);
  } catch (error) {
    res.status(500).json({ message: "Error al crear descuento", error });
  }
};

// Obtener todos los descuentos
exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate("appliesTo");
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los descuentos", error });
  }
};

// Aplicar descuento a un evento
exports.applyDiscountToEvent = async (req, res) => {
  try {
    const { discountId, eventId } = req.body;

    const discount = await Discount.findById(discountId);
    if (!discount) {
      return res.status(404).json({ message: "Descuento no encontrado" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    event.discount = discount._id;
    await event.save();

    res.status(200).json({ message: "Descuento aplicado al evento", event });
  } catch (error) {
    res.status(500).json({ message: "Error al aplicar descuento", error });
  }
};
