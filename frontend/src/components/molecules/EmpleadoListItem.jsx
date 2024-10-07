import propTypes from 'prop-types';

const EmpleadoListItem = ({ empleado, onSelect }) => {
  return (
    <div
      className="empleado-list-item border border-gray-300 rounded-lg p-4 hover:shadow-lg cursor-pointer transition-shadow"
      onClick={() => onSelect(empleado.id)}
    >
      <h3 className="text-lg font-semibold">{empleado.nombre}</h3>
      <h4 className="text-md font-medium text-blue-500 mt-2">Información detallada</h4>
    </div>
  );
};

EmpleadoListItem.propTypes = {
  empleado: propTypes.shape({
    id: propTypes.number.isRequired,
    nombre: propTypes.string.isRequired,
    fechaIngreso: propTypes.string.isRequired,
    salario: propTypes.number.isRequired,
  }).isRequired,
  onSelect: propTypes.func.isRequired,
};

export default EmpleadoListItem;