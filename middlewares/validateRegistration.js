const { check } = require('express-validator');

const validateRegistration = [
  check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
  check('email', 'Agrega un email válido').isEmail(),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
];

module.exports = validateRegistration;
