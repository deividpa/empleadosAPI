const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');
const authMiddleware = require('../middlewares/authMiddleware');

// Consultar solicitudes (accesible para todos los roles)
// Consultar solicitudes
router.get('/', authMiddleware.verifyToken, solicitudController.getAllSolicitudes);
// Consultar una solicitud
router.get('/:id', authMiddleware.verifyToken, solicitudController.getSolicitudById);

// Solo los administradores pueden insertar, actualizar y eliminar
// Crear solicitud
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, solicitudController.createSolicitud);
// Actualizar solicitud
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, solicitudController.updateSolicitud);
// Eliminar solicitud
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, solicitudController.deleteSolicitud);

module.exports = router;