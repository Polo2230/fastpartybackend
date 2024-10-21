const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/auth.controller');
const { loginUser } = require('../controllers/auth.controller');
const validateRegistration = require('../middlewares/validateRegistration');
const validateLogin = require('../middlewares/validateLogin');


router.post('/register', validateRegistration, registerUser);

router.post('/login', validateLogin, loginUser);

module.exports = router;
