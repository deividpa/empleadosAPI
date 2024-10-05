const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateEmpleado } = require('../middlewares/validation/empleadoValidation');


// Ruta para paginación y filtrado
router.get('/buscar', authMiddleware.verifyToken, empleadoController.getEmpleados);

// Consultar empleados
router.get('/', authMiddleware.verifyToken, empleadoController.getAllEmpleados); 
// Consultar un empleado
router.get('/:id', authMiddleware.verifyToken, empleadoController.getEmpleadoById);
// Crear empleado
router.post('/', authMiddleware.verifyToken, validateEmpleado, empleadoController.createEmpleado);

// Solo administradores pueden eliminar

// Eliminar empleado
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, empleadoController.deleteEmpleado);


module.exports = router;