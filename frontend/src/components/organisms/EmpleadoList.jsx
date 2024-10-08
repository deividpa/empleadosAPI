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
  const [showAlert, setShowAlert] = useState(user?.role !== 'admin');

  const handleSelectEmpleado = (empleado) => {
    setSelectedEmpleado(empleado);
    setIsDeleted(false);
  };

  return (
    <div className="container mx-auto p-4">
      {showAlert && (
        <div className="bg-orange-200 text-orange-800 p-4 rounded-lg mb-4 relative">
          <span className="block">Solo los administradores pueden crear nuevos empleados.</span>
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
      {Array.isArray(empleados) && empleados.length > 0 ? (
        empleados.map((empleado) => (
          <div
            key={empleado.id}
            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelectEmpleado(empleado)}
          >
            <p className="text-lg text-blue-700"><strong>ID:</strong> {empleado.id}</p>
            <p><strong>Nombre:</strong> {empleado.nombre}</p>
            <p><strong>Fecha de Ingreso:</strong> {new Date(empleado.fechaIngreso).toLocaleDateString()}</p>
            <p><strong>Salario:</strong> {empleado.salario}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No hay empleados disponibles.</p>
      )}
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