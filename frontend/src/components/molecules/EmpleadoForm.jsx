import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { EmpleadoContext } from '../../context/EmpleadoContext';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const EmpleadoForm = () => {
  const { user } = useContext(AuthContext);
  const { addEmpleado } = useContext(EmpleadoContext);
  const [nombre, setNombre] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [salario, setSalario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmpleado({ nombre, fechaIngreso, salario });
      setMensaje('Empleado creado con éxito');
    } catch (error) {
      setMensaje('Error al crear empleado');
      console.error('Error:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>No puedes crear nuevos empleados ya que no eres administrador.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <Label htmlFor="nombre">Nombre:</Label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            name="nombre"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="fechaIngreso">Fecha de Ingreso:</Label>
          <Input
            type="date"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            name="fechaIngreso"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="salario">Salario:</Label>
          <Input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            name="salario"
            required
          />
        </div>
        <Button type="submit" className='bg-green-400 text-cyan-950 mb-6'>Crear Empleado</Button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EmpleadoForm;