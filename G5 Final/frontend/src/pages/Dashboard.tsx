import { useEmpleados } from '../hooks/useEmpleados';
import { useClientes } from '../hooks/useClientes';
import StatsCard from '../components/StatsCard';
import { FaUserTie, FaUsers } from 'react-icons/fa';

export default function Dashboard() {
  const { data: empleados, loading: loadingEmpleados } = useEmpleados();
  const { data: clientes, loading: loadingClientes } = useClientes();

  const loading = loadingEmpleados || loadingClientes;

  return (
    <main style={{ padding: '2rem', backgroundColor: '#0e1117', color: '#fff' }}>
      <h2 style={{ fontSize: '25px' }}>Vista General</h2>

      {loading ? (
        <p style={{ fontSize: '18px' }}>Cargando datos...</p>
      ) : (
        <>
          {/* Totales */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <StatsCard title="Empleados" count={empleados.length} icon={<FaUserTie />} />
            <StatsCard title="Clientes" count={clientes.length} icon={<FaUsers />} />
          </div>

          {/* Contenedor de listas con separación */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', justifyContent: 'center' }}>
            {/* Últimos 5 empleados */}
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#1a1e24', borderRadius: '8px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '23px' }}>
                <FaUserTie /> Últimos empleados en registrarse
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {empleados.slice(-5).map((e) => (
                  <li key={e.id} style={{ padding: '0.5rem', fontSize: '18px' }}>
                    {e.nombre} {e.apellido} – {e.cargo}
                  </li>
                ))}
              </ul>
            </div>

            {/* Últimos 5 clientes */}
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#1a1e24', borderRadius: '8px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '23px' }}>
                <FaUsers /> Últimos clientes en registrarse
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {clientes.slice(-5).map((c) => (
                  <li key={c.id} style={{ padding: '0.5rem', fontSize: '18px' }}>
                    {c.nombre} {c.apellido}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </main>
  );
}