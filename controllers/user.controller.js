const User = require('../models/user.model'); 

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios de la base de datos
    res.status(200).json(users); // Enviar la lista de usuarios como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

module.exports = {
  getAllUsers,
};
