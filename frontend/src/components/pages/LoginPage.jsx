import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LoginForm from '../molecules/LoginForm';

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="mx-5">
      <h1 className="m-3">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;