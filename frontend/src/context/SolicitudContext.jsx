import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import solicitudService from '../services/solicitudService';

export const SolicitudContext = createContext();

export const SolicitudProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const solicitudesData = await solicitudService.getAllSolicitudes();
      setSolicitudes(solicitudesData);
    };
    fetchEmpleados();
  }, []);

  useEffect(() => {
    solicitudService.getAllSolicitudes().then((data) => setSolicitudes(data));
  }, []);

  const addSolicitud = async (solicitudData) => {
    const newEmpleado = await solicitudService.createSolicitud(solicitudData);
    setSolicitudes((prevEmpleados) => [...prevEmpleados, newEmpleado]);
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