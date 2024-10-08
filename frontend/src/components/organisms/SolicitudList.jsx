import { useState, useContext } from 'react';
import propTypes from 'prop-types';
import SolicitudListItem from '../molecules/SolicitudListItem';
import SolicitudForm from '../molecules/SolicitudForm';
import { AuthContext } from '../../context/AuthContext';

const SolicitudList = ({ solicitudes }) => {
  const { user } = useContext(AuthContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div>
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
        {solicitudes.map((solicitud) => (
          <SolicitudListItem key={solicitud.id} solicitud={solicitud} />
        ))}
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
    })).isRequired,
};

export default SolicitudList;
