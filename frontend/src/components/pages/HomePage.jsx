import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import empleadoService from '../../services/empleadoService';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [empleados, setEmpleados] = useState([]);
  const [page, setPage] = useState(1);
  const [nombre, setNombre] = useState('');

  const size = 10;

  useEffect(() => {
    const fetchEmpleados = async () => {
      if (user && (user.role === 'admin' || user.role === 'empleado')) {
        try {
          const result = await empleadoService.searchEmpleados(page, size, nombre);
          setEmpleados(result.empleados || []);
        } catch (error) {
          console.error('Error al obtener empleados:', error);
        }
      }
    };

    fetchEmpleados();
  }, [user, page, size, nombre]);

  if (!user || (user.role !== 'admin' && user.role !== 'empleado')) {
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la Aplicación</h1>
      <p className="text-lg text-gray-700">
        Aún no tienes permisos para acceder a la funcionalidad de búsqueda. Si deseas hacerlo, puedes{' '}
        <a href="/register" className="text-blue-500 underline">registrarte</a> o{' '}
        <a href="/login" className="text-blue-500 underline">iniciar sesión</a>.
      </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la Aplicación</h1>
      <p className="mb-4">Esta es la página de inicio.</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded mr-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(empleados) && empleados.length > 0 ? (
          empleados.map((empleado) => (
            <div key={empleado.id} className="border p-4 rounded shadow">
              <p><strong>Nombre:</strong> {empleado.nombre}</p>
              <p><strong>Fecha de Ingreso:</strong> {new Date(empleado.fechaIngreso).toLocaleDateString()}</p>
              <p><strong>Salario:</strong> {empleado.salario}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron empleados.</p>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default HomePage;