import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import solicitudService from '../services/solicitudService';
import { AuthContext } from './AuthContext';

export const SolicitudContext = createContext();

export const SolicitudProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (!loading && user) {
        try {
          const solicitudesData = await solicitudService.getAllSolicitudes();
          setSolicitudes(solicitudesData);
        } catch (error) {
          console.error('Error al obtener solicitudes:', error);
        }
      }
    };
    fetchSolicitudes();
  }, [loading, user]);

  useEffect(() => {
    solicitudService.getAllSolicitudes().then((data) => setSolicitudes(data));
  }, []);

  const addSolicitud = async ({codigo, descripcion, resumen, empleadoId}) => {
    const parsedEmpleadoId = parseInt(empleadoId, 10); 
    const newSolicitud = await solicitudService.createSolicitud({
      codigo, 
      descripcion, 
      resumen, 
      empleadoId: parsedEmpleadoId
    }); 
    setSolicitudes((prevEmpleados) => [...prevEmpleados, newSolicitud]);
  };

  return (
    <SolicitudContext.Provider value={{ solicitudes, setSolicitudes, addSolicitud }}>
      {children}
    </SolicitudContext.Provider>
  );
};

SolicitudProvider.propTypes = {
  children: PropTypes.node.isRequired,
};