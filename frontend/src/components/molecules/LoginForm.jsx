import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="username">Username:</Label>
      <Input
        type="text"
        name="username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="Enter your username"
        required
      />
      <Label htmlFor="password">Password:</Label>
      <Input
        type="password"
        name="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Enter your password"
        required
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;