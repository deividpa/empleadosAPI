import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { EmpleadoProvider } from './context/EmpleadoContext';
import { SolicitudProvider } from './context/SolicitudContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/pages/HomePage';
import Navbar from './components/atoms/NavBar';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import EmpleadoForm from './components/molecules/EmpleadoForm';
import SolicitudForm from './components/molecules/SolicitudForm';

// Lazy Loading para las páginas
const EmpleadosPage = lazy(() => import('./components/pages/EmpleadosPage'));
const SolicitudesPage = lazy(() => import('./components/pages/SolicitudesPage'))
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <EmpleadoProvider>
        <SolicitudProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/empleados" element={<EmpleadosPage />} />
                <Route path="/empleados/crear" element={<EmpleadoForm />} />
                <Route path="/solicitudes" element={<SolicitudesPage />} />
                <Route path="/solicitudes/crear" element={<SolicitudForm />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
        </Router>
        </SolicitudProvider>
      </EmpleadoProvider>
    </AuthProvider>
  );
}

export default App;
