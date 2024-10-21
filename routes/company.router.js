const express = require('express');
const router = express.Router();
const { createCompany, getAllCompanies, getCompany, updateCompany } = require('../controllers/company.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth');

// Ruta para crear una empresa (solo para administradores)
router.post('/', authenticateToken, checkRole(['admin']), createCompany);

// Ruta para actualizar una empresa (solo para administradores)
router.put('/:id', authenticateToken, checkRole(['admin']), updateCompany);

// Ruta para obtener todas las empresas
router.get('/', authenticateToken, getAllCompanies);

// Ruta para obtener una empresa por ID
router.get('/:id', authenticateToken, getCompany);

module.exports = router;