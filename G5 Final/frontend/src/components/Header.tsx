import { useAuth } from '../auth/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#1a2634',
        color: '#e0e7f0'
      }}
    >
      {/* IZQUIERDA: Menú de navegación */}
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            textDecoration: 'none',
            fontWeight: 'bold'
          })}
        >
          INICIO
        </NavLink>
        <NavLink
          to="/empleados"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            textDecoration: 'none',
            fontWeight: 'bold'
          })}
        >
          Empleados
        </NavLink>
        <NavLink
          to="/clientes"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            textDecoration: 'none',
            fontWeight: 'bold'
          })}
        >
          Clientes
        </NavLink>

        <NavLink
          to="/libros"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            textDecoration: 'none',
            fontWeight: 'bold'
          })}
        >
          Libros
        </NavLink>

        <NavLink
          to="/autores"
          style={({ isActive }) => ({
            color: isActive ? '#4fd1c5' : '#e0e7f0',
            textDecoration: 'none',
            fontWeight: 'bold'
          })}
        >
          Autores
        </NavLink>
      </nav>

      {/* DERECHA: Perfil*/}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={user?.picture}
          alt="Perfil"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <span>{user?.name}</span>
        <button
          onClick={logout}
          style={{
            backgroundColor: '#4fd1c5',
            color: '#1a2634',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}