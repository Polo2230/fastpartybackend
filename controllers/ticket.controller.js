const QRCode = require("qrcode");
const Ticket = require("../models/ticket.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const Discount = require("../models/discount.model");

// Función para generar el QR code
const generateQRCode = async (ticket) => {
  const qrData = `Ticket ID: ${ticket._id}, Event ID: ${ticket.eventId}, Customer ID: ${ticket.customerId}, Price: ${ticket.price}`;
  return await QRCode.toDataURL(qrData);
};

exports.createTicket = async (req, res) => {
  try {
    const { eventId, customerId, price, status } = req.body;

    // Validar si el evento existe
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    const newTicket = new Ticket({
      eventId,
      customerId,
      price,
      status: status || "pendiente", // Valor predeterminado para status
    });

    newTicket.qrCode = await generateQRCode(newTicket);

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: "Error al crear boleto", error });
  }
};

exports.buyTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = await User.findById(req.user._id).populate("customerProfile");
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    if (event.isExclusive && user.role !== "vip") {
      return res
        .status(403)
        .json({ message: "Este evento es exclusivo para usuarios VIP" });
    }

    let finalPrice = event.price;

    // Aplicar descuento si el evento tiene un descuento asociado
    const discounts = await Discount.find({ appliesTo: eventId });
    if (discounts.length > 0) {
      const customerAgeInDays = Math.floor(
        (Date.now() - new Date(user.customerProfile.createdAt)) / (1000 * 60 * 60 * 24)
      );

      // Filtrar descuentos aplicables según la antigüedad del cliente y las fechas de validez
      const validDiscounts = discounts.filter(discount => {
        return (
          discount.minCustomerAge <= customerAgeInDays &&
          discount.validFrom <= Date.now() &&
          discount.validUntil >= Date.now()
        );
      });

      if (validDiscounts.length > 0) {
        const discount = validDiscounts[0];
        finalPrice -= event.price * (discount.percentage / 100);
      }
    }

    const newTicket = new Ticket({
      eventId,
      customerId: user._id,
      price: finalPrice,
      status: "pendiente",
    });

    newTicket.qrCode = await generateQRCode(newTicket);

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: "Error al comprar la boleta", error });
  }
};
