const Joi = require('joi');

const validateDate = (value, helpers) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return helpers.error('any.invalid');
  }
  return date;
};

const empleadoSchema = Joi.object({
  fechaIngreso: Joi.string().custom(validateDate).required(),
  nombre: Joi.string().max(50).required(),
  salario: Joi.number().positive().required(),
});

exports.validateEmpleado = (req, res, next) => {
  const { error } = empleadoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};