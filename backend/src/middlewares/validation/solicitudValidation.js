const Joi = require('joi');

const solicitudSchema = Joi.object({
  codigo: Joi.string().max(50).required(),
  descripcion: Joi.string().max(50).required(),
  resumen: Joi.string().max(50).required(),
  empleadoId: Joi.number().positive().required(),
});

exports.validateSolicitud = (req, res, next) => {
  const { error } = solicitudSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};