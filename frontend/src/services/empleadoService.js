import axios from 'axios';

const API_URL = '/api/empleados';

// Obtener todos los empleados
const getAllEmpleados = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

// Buscar empleados por nombre
const searchEmpleados = async (page, size, nombre) => {
  const response = await axios.get(`${API_URL}/buscar`, {
    params: { page, size, nombre },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  return response.data;
};

// Crear un nuevo empleado
const createEmpleado = async (empleadoData) => {
  const response = await axios.post(API_URL, empleadoData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const deleteEmpleado = async (empleadoId) => {
  const response = await axios.delete(`${API_URL}/${empleadoId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const empleadoService = {
  getAllEmpleados,
  searchEmpleados,
  createEmpleado,
  deleteEmpleado,
};

export default empleadoService;
