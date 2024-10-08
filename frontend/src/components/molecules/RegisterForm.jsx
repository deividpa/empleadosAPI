import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

const RegisterForm = () => {
  const [userData, setUserData] = useState({ username: '', password: '', role: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username:</Label>
        <Input
          type="text"
          name="username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          placeholder="Enter your username"
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</Label>
        <Input
          type="password"
          name="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="Enter your password"
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role:</Label>
        <Input
          type="text"
          name="role"
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          placeholder="Enter your role"
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </Button>
    </form>
  );  
};

export default RegisterForm;