import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Login from '../auth/Login';
import Dashboard from '../pages/Dashboard';
import Empleados from '../pages/Empleados';
import Clientes from '../pages/Clientes';
import Layout from '../components/Layout';
import Autores from '../pages/Autores'; 
import Libros from '../pages/Libros';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {user && (
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/autores" element={<Autores />} />
        </Route>
      )}

      {!user && <Route path="*" element={<Navigate to="/login" />} />}
    </Routes>
  );
}
