import { useState, useContext } from 'react';
import { EmpleadoContext } from '../../context/EmpleadoContext';
import { AuthContext } from '../../context/AuthContext';
import EmpleadoDetail from './EmpleadoDetail';
import EmpleadoForm from '../molecules/EmpleadoForm';

import Button from '../atoms/Button';

const EmpleadoList = () => {
  const { empleados } = useContext(EmpleadoContext);
  const { user } = useContext(AuthContext);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSelectEmpleado = (empleado) => {
    setSelectedEmpleado(empleado);
    setIsDeleted(false);
  };

  return (
    <div className="container mx-auto p-4">
      {user && user.role === 'admin' && (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {empleados.map((empleado) => (
          <div
            key={empleado.id}
            className="border p-4 rounded shadow cursor-pointer"
            onClick={() => handleSelectEmpleado(empleado)}
          >
            <p><strong>Nombre:</strong> {empleado.nombre}</p>
            <p><strong>Fecha de Ingreso:</strong> {new Date(empleado.fechaIngreso).toLocaleDateString()}</p>
            <p><strong>Salario:</strong> {empleado.salario}</p>
          </div>
        ))}
      </div>
      {selectedEmpleado && (
        <EmpleadoDetail
          empleado={selectedEmpleado}
          isDeleted={isDeleted}
          setIsDeleted={setIsDeleted}
        />
      )}
    </div>
  );
};

export default EmpleadoList;