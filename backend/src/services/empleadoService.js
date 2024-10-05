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

exports.update = async (id, empleadoData) => {
  return await prisma.empleado.update({
    where: { id: parseInt(id) },
    data: empleadoData
  });
};

exports.delete = async (id) => {
  return await prisma.empleado.delete({ where: { id: parseInt(id) } });
};