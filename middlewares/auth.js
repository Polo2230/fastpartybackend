const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Asegúrate de ajustar la ruta según tu estructura de proyecto
const secret = process.env.JWT_SECRET || 'FAST_PARTY';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) return res.sendStatus(401); // Sin token, no autorizado

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Token no válido

    req.user = user; // Guardar la información del usuario en la solicitud
    next(); // Pasar al siguiente middleware o ruta
  });
};

const checkRole = (roles) => (req, res, next) => {
  // Asegúrate de que el modelo `User` esté correctamente importado
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      next();
    })
    .catch(err => {
      res.status(500).json({ message: 'Error al verificar el rol del usuario', err });
    });
};

const checkSuperadmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'No tienes acceso a esta funcionalidad' });
  }
  next();
};

module.exports = {
  authenticateToken,
  checkRole,
  checkSuperadmin
};
