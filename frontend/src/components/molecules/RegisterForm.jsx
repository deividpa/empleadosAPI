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
    <form onSubmit={handleSubmit}>
      <Label htmlFor="username">Username:</Label>
      <Input
        type="text"
        name="username"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        placeholder="Enter your username"
        required
      />
      <Label htmlFor="password">Password:</Label>
      <Input
        type="password"
        name="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="Enter your password"
        required
      />
      <Label htmlFor="role">Role:</Label>
      <Input
        type="text"
        name="role"
        value={userData.role}
        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        placeholder="Enter your role"
        required
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;