import { useContext } from 'react';
import { SolicitudContext } from '../../context/SolicitudContext';
import SolicitudList from '../organisms/SolicitudList';

const SolicitudesPage = () => {
  const { solicitudes } = useContext(SolicitudContext);

  return (
    <div className="mx-5">
      <h1 className="w-full p-5 bg-slate-200">Solicitudes</h1>
      <SolicitudList solicitudes={solicitudes} />
    </div>
  );
};

export default SolicitudesPage;