require('dotenv').config();
const express = require('express');
const app = express();
const prisma = require('./config/prismaClient');
const empleadoRoutes = require('./routes/empleadoRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');


// Middlewares
app.use(express.json());

// Rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

module.exports = app;