import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SolicitudContext } from '../../context/SolicitudContext';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SolicitudForm = () => {
  const { user } = useContext(AuthContext);
  const { addSolicitud } = useContext(SolicitudContext);
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [resumen, setResumen] = useState('');
  const [empleadoId, setEmpleadoId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSolicitud({ codigo, descripcion, resumen, empleadoId });
      setMensaje('Solicitud creada con éxito');
    } catch (error) {
      if (error.response && error.response.data.error) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje('Error al crear solicitud');
      }
      console.error('Error:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>No puedes crear nuevas solicitudes ya que no eres administrador.</p>;
  }

  return (
    <div className="solicitud-form max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Crear Nueva Solicitud</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <Label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">Código:</Label>
          <Input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            name="codigo"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción:</Label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            name="descripcion"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
  
        <div className="mb-4">
          <Label htmlFor="resumen" className="block text-sm font-medium text-gray-700 mb-2">Resumen:</Label>
          <textarea
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
            name="resumen"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
  
        <div className="mb-4">
          <Label htmlFor="empleadoId" className="block text-sm font-medium text-gray-700 mb-2">Empleado ID:</Label>
          <input
            type="text"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
            name="empleadoId"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear Solicitud
        </Button>
      </form>
  
      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
    </div>
  );
  
};

export default SolicitudForm;
