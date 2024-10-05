const solicitudService = require('../services/solicitudService');

exports.getAllSolicitudes = async (req, res) => {
  try {
    const solicitudes = await solicitudService.getAll();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes', error });
  }
};

exports.getSolicitudById = async (req, res) => {
  try {
    const solicitud = await solicitudService.getById(req.params.id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la solicitud', error });
  }
};

exports.createSolicitud = async (req, res) => {
  try {
    const newSolicitud = await solicitudService.create(req.body);
    res.status(201).json(newSolicitud);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear solicitud', error });
  }
};

exports.updateSolicitud = async (req, res) => {
  try {
    const updatedSolicitud = await solicitudService.update(req.params.id, req.body);
    if (!updatedSolicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    res.json(updatedSolicitud);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la solicitud', error });
  }
};

exports.deleteSolicitud = async (req, res) => {
  try {
    const deletedSolicitud = await solicitudService.delete(req.params.id);
    if (!deletedSolicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
    res.json({ message: 'Solicitud eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la solicitud', error });
  }
};