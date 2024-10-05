const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async () => {
  return await prisma.solicitud.findMany();
};

exports.getById = async (id) => {
  return await prisma.solicitud.findUnique({ where: { id: parseInt(id) } });
};

exports.create = async (solicitudData) => {
  try {
    return await prisma.solicitud.create({ data: solicitudData });
  } catch (error) {
    console.error('Error creando solicitud:', error);
    throw error;
  }
};

exports.delete = async (id) => {
  return await prisma.solicitud.delete({ where: { id: parseInt(id) } });
};

exports.getEmpleados = async (page, size, codigo) => {
  const skip = (page - 1) * size;
  const take = parseInt(size);

  const solicitudes = await prisma.solicitud.findMany({
    skip,
    take,
    where: {
      codigo: {
        contains: codigo || '',
        mode: 'insensitive',
      },
    },
  });

  const total = await prisma.solicitud.count({
    where: {
      codigo: {
        contains: codigo || '',
      },
    },
  });

  return {
    solicitudes,
    total,
    totalPages: Math.ceil(total / size),
    currentPage: page,
  };
};