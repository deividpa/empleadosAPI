const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async () => {
  return await prisma.empleado.findMany();
};

exports.getById = async (id) => {
  return await prisma.empleado.findUnique({ where: { id: parseInt(id) } });
};

exports.create = async (empleadoData) => {
  return await prisma.empleado.create({ data: empleadoData });
};

exports.delete = async (id) => {
  return await prisma.empleado.delete({ where: { id: parseInt(id) } });
};

exports.getEmpleados = async (page, size, nombre) => {
  const skip = (page - 1) * size;
  const take = parseInt(size);

  const whereClause = nombre ? {
    nombre: {
      contains: nombre,
      mode: 'insensitive',
    },
  } : {};

  const empleados = await prisma.empleado.findMany({
    skip,
    take,
    where: whereClause,
  });

  const total = await prisma.empleado.count({
    where: whereClause,
  });

  return {
    empleados,
    total,
    totalPages: Math.ceil(total / size),
    currentPage: page,
  };
};
