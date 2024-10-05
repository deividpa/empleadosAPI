const empleadoService = require('../services/empleadoService');

exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.getAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await empleadoService.getById(req.params.id);
    if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el empleado', error });
  }
};

exports.createEmpleado = async (req, res) => {
  try {
    const newEmpleado = await empleadoService.create(req.body);
    res.status(201).json(newEmpleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empleado', error });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const updatedEmpleado = await empleadoService.update(req.params.id, req.body);
    if (!updatedEmpleado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(updatedEmpleado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el empleado', error });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const deletedEmpleado = await empleadoService.delete(req.params.id);
    if (!deletedEmpleado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ message: 'Empleado eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el empleado', error });
  }
};