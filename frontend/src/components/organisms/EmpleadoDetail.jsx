import propTypes from 'prop-types';

const EmpleadoDetail = ({ empleado }) => {
  if (!empleado) 
    return (
      <p className="text-center text-gray-600">Selecciona un empleado para ver los detalles</p>
    );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">{empleado.nombre}</h2>
      <div className="mb-2">
        <p className="text-gray-700">
          <strong>Fecha de ingreso:</strong> {empleado.fechaIngreso}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700">
          <strong>Nombre:</strong> {empleado.nombre}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700">
          <strong>Salario:</strong> ${empleado.salario.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

EmpleadoDetail.propTypes = {
  empleado: propTypes.shape({
    id: propTypes.number.isRequired,
    fechaIngreso: propTypes.string.isRequired,
    nombre: propTypes.string.isRequired,
    salario: propTypes.number.isRequired,
  }),
};

export default EmpleadoDetail;