function errorHandler(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Errores conocidos de Prisma (por ejemplo, cuando una operación SQL falla)
      res.status(400).json({ error: 'Error conocido de Prisma', details: err.meta });
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      // Error de validación de Prisma
      res.status(400).json({ error: 'Error de validación en Prisma', message: err.message });
    } else {
      // Otros errores generales
      res.status(500).json({ error: 'Error interno del servidor', message: err.message });
    }
  }
  
  module.exports = errorHandler;