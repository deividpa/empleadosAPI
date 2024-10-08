import { useContext } from 'react';
import propTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import { EmpleadoContext } from '../../context/EmpleadoContext';
import empleadoService from '../../services/empleadoService';

const EmpleadoDetail = ({ empleado, isDeleted, setIsDeleted }) => {
  const { user } = useContext(AuthContext);
  const { setEmpleados } = useContext(EmpleadoContext);

  if (!empleado) 
    return (
      <p className="text-center text-gray-600">Selecciona un empleado para ver los detalles</p>
    );

  const handleDelete = async () => {
    try {
      await empleadoService.deleteEmpleado(empleado.id);
      setEmpleados((prevEmpleados) => prevEmpleados.filter((e) => e.id !== empleado.id));
      setIsDeleted(true);
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-6 ${isDeleted ? 'bg-red-100' : ''}`}>
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">{empleado.nombre}</h2>
      <div className="mb-2">
        <div className="mb-2">
          <p className="text-gray-900">
            <strong>ID:</strong> {empleado.id}
          </p>
        </div>
        <p className="text-gray-700">
          <strong>Fecha de ingreso:</strong> {new Date(empleado.fechaIngreso).toLocaleDateString()}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700">
          <strong>Nombre:</strong> {empleado.nombre}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700">
          <strong>Salario:</strong> ${empleado.salario.toLocaleString()}
        </p>
      </div>
      {isDeleted ? (
        <p className="text-red-600 text-center mt-4">El empleado ha sido eliminado.</p>
      ) : (
        user && user.role === 'admin' && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Eliminar
          </button>
        )
      )}
    </div>
  );
};

EmpleadoDetail.propTypes = {
  empleado: propTypes.shape({
    id: propTypes.number.isRequired,
    fechaIngreso: propTypes.string.isRequired,
    nombre: propTypes.string.isRequired,
    salario: propTypes.number.isRequired,
  }),
  isDeleted: propTypes.bool.isRequired,
  setIsDeleted: propTypes.func.isRequired,
};

export default EmpleadoDetail;