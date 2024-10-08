const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prismaClient');
const { validateUser } = require('../middlewares/validation/userValidation');

// Endpoint para registrar un usuario
router.post('/register', validateUser, async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role
      }
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro del usuario', error });
  }
});

// Endpoint para hacer login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10d' });

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al hacer login', error });
  }
});

module.exports = router;