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
  const [empleado, setEmpleado] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSolicitud({ codigo, descripcion, resumen, empleado });
      setMensaje('Solicitud creada con éxito');
    } catch (error) {
      setMensaje('Error al crear solicitud');
      console.error('Error:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>No puedes crear nuevas solicitudes ya que no eres administrador.</p>;
  }

  return (
    <div className="solicitud-form">
      <h2>Crear Nueva Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="codigo">Código:</Label>
          <Input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            name="codigo"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="descripcion">Descripción:</Label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            name="descripcion"
            required
            className="textarea border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <Label htmlFor="resumen">Resumen:</Label>
          <textarea
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
            name="resumen"
            required
            className="textarea border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4"> 
          <Label htmlFor="empleado">Empleado:</Label>
          <Input
            type="text"
            value={empleado}
            onChange={(e) => setEmpleado(e.target.value)}
            name="empleado"
            required
          />
        </div>
        <Button type="submit">Crear Solicitud</Button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default SolicitudForm;
