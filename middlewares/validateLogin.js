const { check } = require('express-validator');

const validateLogin = [
  check('email', 'Agrega un email válido').isEmail(),
  check('password', 'La contraseña es obligatoria').exists(),
];

module.exports = validateLogin;
