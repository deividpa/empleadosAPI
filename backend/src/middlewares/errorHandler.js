const { Prisma } = require('@prisma/client');

function errorHandler(err, req, res, next) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Errores conocidos de Prisma (por ejemplo, cuando una operación SQL falla)
    res.status(400).json({ 
      error: 'Error conocido de Prisma', 
      details: err.meta 
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Error de validación de Prisma
    const errorMessage = getPrismaValidationErrorMessage(err);
    res.status(400).json({ 
      error: 'Error de validación en Prisma', 
      message: errorMessage 
    });
  } else {
    res.status(500).json({ error: 'Error interno del servidor', message: err.message });
  }
}

// Función para devolver mensajes de error específicos de validación
function getPrismaValidationErrorMessage(err) {
  if (err.message.includes('Invalid datetime')) {
    return 'La fecha debe estar en el formato YYYY-MM-DD. Ejemplo: 2018-10-28';
  }
  return err.message;
}

module.exports = errorHandler;
