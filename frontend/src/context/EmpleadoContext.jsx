import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import empleadoService from '../services/empleadoService';

export const EmpleadoContext = createContext();

export const EmpleadoProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const empleadosData = await empleadoService.getAllEmpleados();
      setEmpleados(empleadosData);
    };
    fetchEmpleados();
  }, []);

  const addEmpleado = async (empleadoData) => {
    const newEmpleado = await empleadoService.createEmpleado(empleadoData);
    setEmpleados((prevEmpleados) => [...prevEmpleados, newEmpleado]);
  };

  return (
    <EmpleadoContext.Provider value={{ empleados, setEmpleados, addEmpleado }}>
      {children}
    </EmpleadoContext.Provider>
  );
};

EmpleadoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};