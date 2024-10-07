const empleadoService = require('../services/empleadoService');

exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.getAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error });
  }
};

exports.getEmpleados = async (req, res) => {
  const { page = 1, size = 10, nombre } = req.query;

  try {
    const result = await empleadoService.getEmpleados(parseInt(page), parseInt(size), nombre);
    res.status(200).json(result);
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
  console.log("Creando empleado desde el backend: ", req.body)
  const { fechaIngreso, nombre, salario } = req.body;
  const fechaIngresoDate = new Date(fechaIngreso);

  if (isNaN(fechaIngresoDate.getTime())) {
    return res.status(400).json({
      message: 'Formato de fecha inválido. Debe ser YYYY-MM-DD.',
    });
  }

  const parsedSalario = parseFloat(salario);

  if (isNaN(parsedSalario)) {
    return res.status(400).json({ message: 'El salario debe ser un número válido.' });
  }
  try {
    const newEmpleado = await empleadoService.create({
      fechaIngreso: fechaIngresoDate,
      nombre,
      salario: parsedSalario,
    });
    res.status(201).json(newEmpleado);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al crear empleado', error });
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