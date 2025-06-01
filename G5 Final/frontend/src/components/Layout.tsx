import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FaHome, FaUserTie, FaUsers, FaBook, FaPenNib, FaSignOutAlt, FaBell } from 'react-icons/fa';

export default function Layout() {
  const { logout } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a2634', color: '#e0e7f0' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          backgroundColor: '#15202b',
          color: '#e0e7f0',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ color: '#ffffff', marginBottom: '2rem', fontSize: '25px', textAlign: 'center', lineHeight: '1.2' }}>
  Panel <br /> Administrativo
</h2>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? '#000000' : '#e0e7f0',
            backgroundColor: isActive ? '#ffffff' : 'transparent',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderLeft: isActive ? '4px solid #ffffff' : '4px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          })}
        >
          <FaHome /> Inicio
        </NavLink>

        <NavLink
          to="/empleados"
          style={({ isActive }) => ({
            color: isActive ? '#000000' : '#e0e7f0',
            backgroundColor: isActive ? '#ffffff' : 'transparent',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderLeft: isActive ? '4px solid #ffffff' : '4px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          })}
        >
          <FaUserTie /> Empleados
        </NavLink>

        <NavLink
          to="/clientes"
          style={({ isActive }) => ({
            color: isActive ? '#000000' : '#e0e7f0',
            backgroundColor: isActive ? '#ffffff' : 'transparent',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderLeft: isActive ? '4px solid #ffffff' : '4px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          })}
        >
          <FaUsers /> Clientes
        </NavLink>

        <NavLink
          to="/libros"
          style={({ isActive }) => ({
            color: isActive ? '#000000' : '#e0e7f0',
            backgroundColor: isActive ? '#ffffff' : 'transparent',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderLeft: isActive ? '4px solid #ffffff' : '4px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          })}
        >
          <FaBook /> Libros
        </NavLink>

        <NavLink
          to="/autores"
          style={({ isActive }) => ({
            color: isActive ? '#000000' : '#e0e7f0',
            backgroundColor: isActive ? '#ffffff' : 'transparent',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderLeft: isActive ? '4px solid #ffffff' : '4px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          })}
        >
          <FaPenNib /> Autores
        </NavLink>

        

      <NavLink
        to="/notificaciones"
        style={({ isActive }) => ({
          color: isActive ? "#000000" : "#e0e7f0",
          backgroundColor: isActive ? "#ffffff" : "transparent",
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          textDecoration: "none",
          borderRadius: "6px",
          fontSize: "18px",
          fontWeight: "bold",
          borderLeft: isActive ? "4px solid #ffffff" : "4px solid transparent",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        })}
      >
        <FaBell /> Notificaciones
      </NavLink>

        <button
          onClick={logout}
          style={{
            marginTop: 'auto',
            backgroundColor: '#ffffff',
            color: '#1a2634',
            border: 'none',
            padding: '0.6rem 1rem',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}