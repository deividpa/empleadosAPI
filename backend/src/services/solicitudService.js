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


exports.update = async (id, solicitudData) => {
  return await prisma.solicitud.update({
    where: { id: parseInt(id) },
    data: solicitudData
  });
};

exports.delete = async (id) => {
  return await prisma.solicitud.delete({ where: { id: parseInt(id) } });
};