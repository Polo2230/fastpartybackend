const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const { authenticateToken, checkRole } = require("../middlewares/auth");

// Ruta para crear un nuevo boleto (solo accesible para administradores)
router.post(
  "/",
  authenticateToken,  
  ticketController.createTicket
);

// Ruta para obtener todos los boletos (accesible para admins y superadmins)
router.get(
  "/",
  authenticateToken,
  ticketController.getTickets
);

// Ruta para comprar boletas (accesible para usuarios registrados)
router.post(
  "/buy",
  authenticateToken,
  checkRole(["user", "vip", "admin", "superadmin"]), // Verifica que el usuario esté registrado
  ticketController.buyTicket
);

module.exports = router;
