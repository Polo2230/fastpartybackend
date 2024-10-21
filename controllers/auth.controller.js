const User = require("../models/user.model");
const Customer = require("../models/customer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const secret = process.env.JWT_SECRET || 'FAST_PARTY';

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, phone, birthday } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear nuevo perfil de cliente
    const customer = new Customer({
      fullname,
      email,
      phone,
      identification,
      birthday      
    });
    await customer.save();

    // Crear nuevo usuario y vincularlo al perfil de cliente
    user = new User({
      username,
      email,
      password, // La contraseña se encripta automáticamente en el pre-save hook
      customerProfile: customer._id
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
        customerProfile: user.customerProfile,
      },
    };

    // Generar token JWT
    jwt.sign(
      payload,
      secret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en el servidor");
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Crear el payload para el JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role, 
        username: user.username,
        email: user.email,
      },
    };

    // Generar token JWT
    jwt.sign(
      payload,
      secret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en el servidor");
  }
};
