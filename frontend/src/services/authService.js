import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api/auth';

// Registro de usuario
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login de usuario
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const getLoggedUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = jwtDecode(token);
    return user;
  }
  return null;
};

// Logout de usuario
const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  getLoggedUser,
  logout,
};

export default authService;