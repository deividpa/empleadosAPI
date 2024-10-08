import { useContext } from 'react';
import propTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import { SolicitudContext } from '../../context/SolicitudContext';
import solicitudService from '../../services/solicitudService';

const SolicitudListItem = ({ solicitud }) => {
  const { user } = useContext(AuthContext);
  const { setSolicitudes } = useContext(SolicitudContext);

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await solicitudService.deleteSolicitud(solicitud.id);
      setSolicitudes((prevSolicitudes) => prevSolicitudes.filter((s) => s.id !== solicitud.id));
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 relative"
    >
      <h3 className="text-lg font-semibold text-blue-600">Código:</h3>
      <p className="text-gray-800">{solicitud.codigo}</p>

      <h3 className="mt-2 text-lg font-semibold text-blue-600">Descripción:</h3>
      <p className="text-gray-800">{solicitud.descripcion}</p>

      <h3 className="mt-2 text-lg font-semibold text-blue-600">Resumen:</h3>
      <p className="text-gray-800">{solicitud.resumen}</p>

      <h3 className="mt-2 text-lg font-semibold text-blue-600">Empleado ID:</h3>
      <p className="text-gray-800">{solicitud.empleadoId}</p>

      {user && user.role === 'admin' && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      )}
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
};

export default SolicitudListItem;