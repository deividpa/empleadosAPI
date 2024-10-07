import { createContext, useState, useEffect} from 'react';
import authService from '../services/authService';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = authService.getLoggedUser();
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const login = async (credentials) => {
    const loggedUser = await authService.login(credentials);
    setUser(loggedUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
