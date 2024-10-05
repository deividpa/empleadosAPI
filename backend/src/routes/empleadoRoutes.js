const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Rutas
// Todos pueden consultar empleados
// Consultar empleados
router.get('/', authMiddleware.verifyToken, empleadoController.getAllEmpleados); 
// Consultar un empleado
router.get('/:id', authMiddleware.verifyToken, empleadoController.getEmpleadoById); 

// Solo administradores pueden insertar, actualizar o eliminar
// Crear empleado
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, empleadoController.createEmpleado);
// Actualizar empleado
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, empleadoController.updateEmpleado);
// Eliminar empleado
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, empleadoController.deleteEmpleado);

module.exports = router;