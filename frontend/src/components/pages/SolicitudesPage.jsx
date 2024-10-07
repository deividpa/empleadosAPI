import { useContext, useState } from 'react';
import { SolicitudContext } from '../../context/SolicitudContext';
import SolicitudList from '../organisms/SolicitudList';
import SolicitudDetail from '../organisms/SolicitudDetail';

const SolicitudesPage = () => {
  const { solicitudes } = useContext(SolicitudContext);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);


  const handleSelectSolicitud = (solicitudId) => {
    const solicitud = solicitudes.find((s) => s.id === solicitudId);
    setSelectedSolicitud(solicitud);
  };

  return (
    <div className="mx-5">
      <h1 className="w-full p-5 bg-slate-200">Solicitudes</h1>
      <SolicitudList solicitudes={solicitudes} onSelect={handleSelectSolicitud} />
      {selectedSolicitud && <SolicitudDetail solicitud={selectedSolicitud} /> }
    </div>
  );
};

export default SolicitudesPage;