
import propTypes from 'prop-types';
import { EmpleadoContext } from '../../context/EmpleadoContext';
import EmpleadoListItem from '../molecules/EmpleadoListItem';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EmpleadoForm from '../molecules/EmpleadoForm';
import Button from '../atoms/Button';
import empleadoService from '../../services/empleadoService';

const EmpleadoList = ({ onSelect }) => {

  const { user } = useContext(AuthContext);
  const { empleados, setEmpleados } = useContext(EmpleadoContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const empleadosData = await empleadoService.getAllEmpleados();
      setEmpleados(empleadosData);
    };

    if (user) {
      fetchEmpleados();
      setIsUserLoaded(true);
    }
  }, [user, setEmpleados]);

  return (
    <div>
      {isUserLoaded && user && user.role === 'admin' && (
        <div className="mt-4">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? 'Ocultar Formulario' : 'Crear Nuevo Empleado'}
          </Button>
          {mostrarFormulario && <EmpleadoForm />}
        </div>
      )}
      <div className="empleado-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {empleados.map((empleado) => (
          <EmpleadoListItem key={empleado.id} empleado={empleado} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

EmpleadoList.propTypes = {
  empleados: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    nombre: propTypes.string.isRequired,
    fechaIngreso: propTypes.string.isRequired,
    salario: propTypes.number.isRequired,
  })).isRequired,
  onSelect: propTypes.func.isRequired,
};

export default EmpleadoList;