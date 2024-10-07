import propTypes from 'prop-types';

const SolicitudDetail = ({ solicitud }) => {
  if (!solicitud) return <p>Selecciona una solicitud para ver los detalles</p>;

  return (
    <div className="solicitud-detail">
      <h2>Solicitud Código: {solicitud.codigo}</h2>
      <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
      <p><strong>Resumen:</strong> {solicitud.resumen}</p>
      <p><strong>Empleado Responsable:</strong> {solicitud.empleadoId}</p>
    </div>
  );
};

SolicitudDetail.propTypes = {
  solicitud: propTypes.shape({
    id: propTypes.number.isRequired,
    codigo: propTypes.string.isRequired,
    descripcion: propTypes.string.isRequired,
    resumen: propTypes.string.isRequired,
    empleadoId: propTypes.number.isRequired,
  }),
};

export default SolicitudDetail;