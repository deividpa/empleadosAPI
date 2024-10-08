import { useState, useContext } from 'react';
import propTypes from 'prop-types';
import SolicitudListItem from '../molecules/SolicitudListItem';
import SolicitudForm from '../molecules/SolicitudForm';
import { AuthContext } from '../../context/AuthContext';

const SolicitudList = ({ solicitudes }) => {
  const { user } = useContext(AuthContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [showAlert, setShowAlert] = useState(user?.role !== 'admin');

  return (
    <div className="container mx-auto p-4">
      {showAlert && (
        <div className="bg-orange-200 text-orange-800 p-4 rounded-lg mb-4 relative">
          <span className="block">Solo los administradores pueden crear nuevas solicitudes.</span>
          <button 
            className="absolute top-0 right-0 mt-2 mr-4 font-bold text-orange-800" 
            onClick={() => setShowAlert(false)}
          >
            x
          </button>
        </div>
      )}

      {user && user.role === 'admin' && (
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? 'Ocultar Formulario' : 'Crear Nueva Solicitud'}
          </button>
          {mostrarFormulario && <SolicitudForm />}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <SolicitudListItem key={solicitud.id} solicitud={solicitud} />
          ))
        ) : (
          <p className="text-center text-gray-600">No hay solicitudes disponibles.</p>
        )}
      </div>
    </div>
  );
};

SolicitudList.propTypes = {
    solicitudes: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number.isRequired,
        codigo: propTypes.string.isRequired,
        descripcion: propTypes.string.isRequired,
        resumen: propTypes.string.isRequired,
        empleadoId: propTypes.number.isRequired,
    })),
};

export default SolicitudList;
