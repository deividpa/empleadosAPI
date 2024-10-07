import axios from 'axios';

const API_URL = '/api/solicitudes';

// Obtener todas las solicitudes
const getAllSolicitudes = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

// Crear una nueva solicitud
const createSolicitud = async (solicitudData) => {
  const response = await axios.post(API_URL, solicitudData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  console.log("Creando solicitud")
  return response.data;
};

// Eliminar una solicitud
const deleteSolicitud = async (solicitudId) => {
  console.log("Eliminando solicitud")
  const response = await axios.delete(`${API_URL}/${solicitudId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const solicitudService = {
  getAllSolicitudes,
  createSolicitud,
  deleteSolicitud,
};

export default solicitudService;