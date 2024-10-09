import { render, screen, fireEvent, waitFor, describe, test, expect, beforeEach } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import RegisterPage from './RegisterPage';
import axios from 'axios';

// Mock de módulos
vi.mock('axios');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...await vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithContext = (user = null) => {
    return render(
      <AuthContext.Provider value={{ user }}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  test('renderiza el formulario de registro correctamente', () => {
    renderWithContext();
    
    expect(screen.getByText('Registro')).toBeInTheDocument();
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rol/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrar/i })).toBeInTheDocument();
  });

  test('maneja la entrada de usuario correctamente', () => {
    renderWithContext();
    
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const roleSelect = screen.getByLabelText(/Rol/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(roleSelect, { target: { value: 'admin' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
    expect(roleSelect).toHaveValue('admin');
  });

  test('envía el formulario correctamente', async () => {
    const mockAxiosPost = vi.spyOn(axios, 'post').mockResolvedValueOnce({});
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithContext();
    
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Registrar/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('/api/auth/register', {
        username: 'testuser',
        password: 'password123',
        role: 'empleado'
      });
      expect(alertMock).toHaveBeenCalledWith('Usuario registrado con éxito');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('maneja errores en el envío del formulario', async () => {
    const mockError = new Error('Error de registro');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(axios, 'post').mockRejectedValueOnce(mockError);
    
    renderWithContext();
    
    const submitButton = screen.getByRole('button', { name: /Registrar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error registrando usuario', mockError);
    });
  });

  test('redirige si el usuario está autenticado', async () => {
    renderWithContext({ id: 1, username: 'testuser' });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});