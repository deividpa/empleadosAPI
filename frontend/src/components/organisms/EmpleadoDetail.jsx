import propTypes from 'prop-types';

const EmpleadoDetail = ({ empleado }) => {
  if (!empleado) return <p>Selecciona un empleado para ver los detalles</p>;

  return (
    <div className="empleado-detail">
      <h2>{empleado.nombre}</h2>
      <p><strong>Fecha ingreso:</strong> {empleado.fechaIngreso}</p>
      <p><strong>Nombre:</strong> {empleado.nombre}</p>
      <p><strong>Salario:</strong> {empleado.salario}</p>
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
