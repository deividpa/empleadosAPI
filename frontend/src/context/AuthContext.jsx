import { createContext, useState, useEffect} from 'react';
import authService from '../services/authService';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = authService.getLoggedUser();
    if (loggedUser) {
      setUser(loggedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const loggedUser = await authService.login(credentials);
      if (loggedUser.token) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        setUser(authService.getLoggedUser());
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedUser');
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
