import propTypes from 'prop-types';

const SolicitudListItem = ({ solicitud, onSelect }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onSelect(solicitud.id)}
    >
      <h3 className="text-lg font-semibold text-blue-600">Código:</h3>
      <p className="text-gray-800">{solicitud.codigo}</p>

      <h3 className="mt-2 text-lg font-semibold text-blue-600">Descripción:</h3>
      <p className="text-gray-800">{solicitud.descripcion}</p>

      <h3 className="mt-2 text-lg font-semibold text-blue-600">Resumen:</h3>
      <p className="text-gray-800">{solicitud.resumen}</p>

      <h3 className="mt-2 text-lg font-semibold text-blue-600">Empleado ID:</h3>
      <p className="text-gray-800">{solicitud.empleadoId}</p>
    </div>
  );
};

SolicitudListItem.propTypes = {
  solicitud: propTypes.shape({
    id: propTypes.number.isRequired,
    codigo: propTypes.string.isRequired,
    descripcion: propTypes.string.isRequired,
    resumen: propTypes.string.isRequired,
    empleadoId: propTypes.number.isRequired,
  }).isRequired,
  onSelect: propTypes.func.isRequired,
};

export default SolicitudListItem;
