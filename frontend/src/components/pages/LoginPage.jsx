import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LoginForm from '../molecules/LoginForm';

const LoginPage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mx-5">
      <h1 className="m-3">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;