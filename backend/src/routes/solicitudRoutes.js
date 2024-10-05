const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateSolicitud } = require('../middlewares/validation/solicitudValidation');

// Ruta para paginación y filtrado
router.get('/buscar', authMiddleware.verifyToken, solicitudController.getSolicitudes);

// Consultar solicitudes (accesible para todos los roles)
// Consultar solicitudes
router.get('/', authMiddleware.verifyToken, solicitudController.getAllSolicitudes);
// Consultar una solicitud
router.get('/:id', authMiddleware.verifyToken, solicitudController.getSolicitudById);
// Crear solicitud
router.post('/', authMiddleware.verifyToken, validateSolicitud, solicitudController.createSolicitud);

// Solo los administradores pueden eliminar
// Eliminar solicitud
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, solicitudController.deleteSolicitud);

module.exports = router;