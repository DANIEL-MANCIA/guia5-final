import { useAutores } from '../hooks/useAutores';
import Table from '../components/Table';
import { postClient, deleteClient, putClient } from '../utils/fetchClient';
import { useEffect, useState } from 'react';
import type { Autor } from '../types/Autor';

export default function Autores() {
  const { data, loading, error } = useAutores();
  const [autores, setAutores] = useState<Autor[]>([]);
  const [editando, setEditando] = useState<Autor | null>(null);

  useEffect(() => {
    setAutores([...data].sort((a, b) => b.id - a.id)); // ✅ Ordenar por ID descendente
  }, [data]);

  if (loading) return <p>Cargando autores...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    { header: 'ID', accessor: 'id' }, // ✅ Se agregó la columna "ID"
    { header: 'Nombres', accessor: 'nombre' },
    { header: 'Apellidos', accessor: 'apellido' },
    { header: 'Nacionalidad', accessor: 'nacionalidad' },
    { header: 'Nacimiento', accessor: 'fecha_nacimiento' },
    { header: 'Acciones', accessor: 'acciones' }, // ✅ Se agregó la columna "Acciones"
  ] as { header: string; accessor: keyof Autor | 'acciones' }[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre')?.toString().trim() ?? '';
    const apellido = formData.get('apellido')?.toString().trim() ?? '';
    const nacionalidad = formData.get('nacionalidad')?.toString().trim() ?? '';
    const fecha_nacimiento = formData.get('fecha_nacimiento')?.toString().trim() ?? '';

    if (!nombre || !apellido || !nacionalidad || !fecha_nacimiento) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const nuevoAutor = await postClient<Autor>('autores', { nombre, apellido, nacionalidad, fecha_nacimiento });
      setAutores([...autores, nuevoAutor].sort((a, b) => b.id - a.id));
      e.currentTarget.reset();
    } catch (err) {
      alert('Error al agregar autor');
      console.error(err);
    }
  };

  const handleEditAutor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editando) return;

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre')?.toString().trim() ?? '';
    const apellido = formData.get('apellido')?.toString().trim() ?? '';
    const nacionalidad = formData.get('nacionalidad')?.toString().trim() ?? '';
    const fecha_nacimiento = formData.get('fecha_nacimiento')?.toString().trim() ?? '';

    try {
      const actualizado = await putClient<Autor>(`autores/${editando.id}`, { nombre, apellido, nacionalidad, fecha_nacimiento });
      setAutores(autores.map((a) => (a.id === actualizado.id ? actualizado : a)));
      setEditando(null);
    } catch (err) {
      alert('Error al actualizar autor');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Autores</h2>

      {/* FORMULARIO NUEVO */}
      <h3 style={{ marginTop: '1rem' }}>Agregar nuevo autor</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="nombre" placeholder="Nombre" required style={inputStyle} />
        <input name="apellido" placeholder="Apellido" required style={inputStyle} />
        <input name="nacionalidad" placeholder="Nacionalidad" required style={inputStyle} />
        <input name="fecha_nacimiento" placeholder="Fecha de Nacimiento" required type="date" style={inputStyle} />
        <button type="submit" style={submitButtonStyle}>Guardar autor</button>
      </form>

      {/* FORMULARIO DE EDICIÓN */}
      {editando && (
        <form onSubmit={handleEditAutor} style={editFormStyle}>
          <h3>Editar autor</h3>
          <input name="nombre" defaultValue={editando.nombre} required style={inputStyle} />
          <input name="apellido" defaultValue={editando.apellido} required style={inputStyle} />
          <input name="nacionalidad" defaultValue={editando.nacionalidad} required style={inputStyle} />
          <input name="fecha_nacimiento" defaultValue={editando.fecha_nacimiento} required type="date" style={inputStyle} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" style={saveButtonStyle}>Guardar cambios</button>
            <button type="button" onClick={() => setEditando(null)} style={cancelButtonStyle}>Cancelar</button>
          </div>
        </form>
      )}

      {/* TABLA */}
      <Table
        data={autores}
        columns={columns}
        filterField="nombre"
        renderRow={(autor: Autor) => (
          <tr key={autor.id} style={rowStyle}>
            <td style={cellStyle}>{autor.id}</td>
            <td style={cellStyle}>{autor.nombre}</td>
            <td style={cellStyle}>{autor.apellido}</td>
            <td style={cellStyle}>{autor.nacionalidad}</td>
            <td style={cellStyle}>{autor.fecha_nacimiento}</td>
            <td style={cellStyle}>
              <button onClick={() => setEditando(autor)} style={editButtonStyle}>Editar</button>
              <button
                onClick={async () => {
                  const confirmar = confirm(`¿Eliminar a ${autor.nombre} ${autor.apellido}?`);
                  if (!confirmar) return;
                  try {
                    await deleteClient(`autores/${autor.id}`);
                    setAutores(autores.filter((a) => a.id !== autor.id));
                  } catch (err) {
                    alert('Error al eliminar autor');
                  }
                }}
                style={deleteButtonStyle}
              >
                Eliminar
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}

// ✅ Estilos ajustados para mejorar alineación
const rowStyle: React.CSSProperties = {
  height: '40px', 
  textAlign: 'center',
};

const cellStyle: React.CSSProperties = {
  padding: '6px',
  textAlign: 'center',
};

const formStyle: React.CSSProperties = {
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
};

const editFormStyle: React.CSSProperties = {
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  background: '#161b22',
  padding: '1rem',
  borderRadius: '8px',
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
};

const submitButtonStyle: React.CSSProperties = {
  padding: '0.6rem',
  backgroundColor: '#1abc9c',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: '#2ecc71',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
};

const editButtonStyle: React.CSSProperties = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
};