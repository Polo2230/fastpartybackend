const express = require("express");
const router = express.Router();
const { authenticateToken, checkRole } = require("../middlewares/auth");
const discountController = require("../controllers/discount.controller");

router.post("/create", authenticateToken, checkRole(["admin", "superadmin"]), discountController.createDiscount);
router.get("/", authenticateToken, checkRole(["admin", "superadmin"]), discountController.getDiscounts);
router.post("/apply", authenticateToken, checkRole(["admin", "superadmin"]), discountController.applyDiscountToEvent);

module.exports = router;
