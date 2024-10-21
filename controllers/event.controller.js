const Event = require("../models/event.model");
const User = require("../models/user.model");

const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, location, capacity, price, imageUrl, organizer } = req.body;

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      location,
      capacity,
      price,
      imageUrl,
      organizer
    });

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Obtener el usuario autenticado

    let query = {};
    if (user.role !== 'vip') {
      query.isExclusive = false; // Filtrar eventos exclusivos si el usuario no es VIP
    }

    const events = await Event.find(query).populate('location').populate('organizer');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos", error });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("location")
      .populate("organizer");
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener evento", error });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
};
