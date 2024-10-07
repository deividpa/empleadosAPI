import { useState, useContext } from 'react';
import { EmpleadoContext } from '../../context/EmpleadoContext';
import EmpleadoList from '../organisms/EmpleadoList';
import EmpleadoDetail from '../organisms/EmpleadoDetail';

const EmpleadosPage = () => {
  const { empleados } = useContext(EmpleadoContext);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  const handleSelectEmpleado = (empleadoId) => {
    const empleado = empleados.find((e) => e.id === empleadoId);
    setSelectedEmpleado(empleado);
  };

  return (
    <div className="mx-5">
      <h1 className="w-full p-5 bg-slate-200">Empleados</h1>
      <EmpleadoList empleados={empleados} onSelect={handleSelectEmpleado} />
      {selectedEmpleado && <EmpleadoDetail empleado={selectedEmpleado} />}
    </div>
  );
};

export default EmpleadosPage;
