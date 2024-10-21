const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEvent } = require('../controllers/event.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth');

// Ruta para crear un evento (solo para administradores o empresas)
router.post('/', authenticateToken, checkRole(['admin', 'company']), createEvent);

// Ruta para obtener todos los eventos
router.get('/', authenticateToken, getAllEvents);

// Ruta para obtener un evento por ID
router.get('/:id', authenticateToken, getEvent);

module.exports = router;
