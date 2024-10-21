const express = require('express');
const { getAllUsers } = require('../controllers/user.controller'); 
const {authenticateToken, checkRole} = require('../middlewares/auth'); // Importar el middleware

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', authenticateToken, checkRole(['admin', 'superadmin']), getAllUsers);

module.exports = router;
