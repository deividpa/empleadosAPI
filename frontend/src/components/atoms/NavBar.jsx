import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">Inicio</Link>
        </li>
        <li>
          <Link to="/empleados" className="text-white hover:text-gray-200">Empleados</Link>
        </li>
        <li>
          <Link to="/solicitudes" className="text-white hover:text-gray-200">Solicitudes</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-gray-200">Registrar</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="text-white hover:text-gray-200">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;