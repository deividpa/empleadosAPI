import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const RegisterPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('empleado');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password, role });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      console.error('Error registrando usuario', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div>
          <label>Rol</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded p-2">
            <option value="empleado">Empleado</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-primary text-white p-2 rounded mt-4">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;