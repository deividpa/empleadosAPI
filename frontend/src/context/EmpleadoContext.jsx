import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import empleadoService from '../services/empleadoService';
import { AuthContext } from './AuthContext';

export const EmpleadoContext = createContext();

export const EmpleadoProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmpleados = async () => {
      if (!loading && user) {
        try {
          const empleadosData = await empleadoService.getAllEmpleados();
          setEmpleados(empleadosData);
        } catch (error) {
          console.error('Error al obtener empleados:', error);
        }
      }
    };
    fetchEmpleados();
  }, [loading, user]);

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