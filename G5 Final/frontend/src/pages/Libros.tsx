import { useLibros } from '../hooks/useLibros';
import Table from '../components/Table';
import { postClient, deleteClient, putClient } from '../utils/fetchClient';
import { useEffect, useState } from 'react';
import type { Libro } from '../types/Libro';

export default function Libros() {
  const { data, loading, error } = useLibros();
  const [libros, setLibros] = useState<Libro[]>([]);
  const [editando, setEditando] = useState<Libro | null>(null);

  useEffect(() => {
    setLibros([...data].sort((a, b) => Number(b.id) - Number(a.id))); // ✅ Ordenar por ID descendente
  }, [data]);

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Título', accessor: 'titulo' },
    { header: 'Autor', accessor: 'autor_nombre' }, // ✅ Se muestra el nombre
    { header: 'Editorial', accessor: 'editorial_nombre' }, // ✅ Se muestra el nombre
    { header: 'Categoría', accessor: 'categoria_nombre' }, // ✅ Se muestra el nombre
    { header: 'ISBN', accessor: 'isbn' },
    { header: 'Publicación', accessor: 'fecha_publicacion' },
    { header: 'Acciones', accessor: 'acciones' },
  ] as { header: string; accessor: keyof Libro | 'acciones' }[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const titulo = formData.get('titulo')?.toString().trim() ?? '';
    const id_autor = formData.get('id_autor')?.toString().trim() ?? '';
    const id_editorial = formData.get('id_editorial')?.toString().trim() ?? '';
    const id_categoria = formData.get('id_categoria')?.toString().trim() ?? '';
    const isbn = formData.get('isbn')?.toString().trim() ?? '';
    const fecha_publicacion = formData.get('fecha_publicacion')?.toString().trim() ?? '';

    if (!titulo || !id_autor || !id_editorial || !id_categoria || !isbn || !fecha_publicacion) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const nuevoLibro = await postClient<Libro>('libros', { titulo, id_autor, id_editorial, id_categoria, isbn, fecha_publicacion });
      setLibros([...libros, nuevoLibro].sort((a, b) => Number(b.id) - Number(a.id)));
      e.currentTarget.reset();
    } catch (err) {
      alert('Error al agregar libro');
      console.error(err);
    }
  };

  const handleEditLibro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editando) return;

    const formData = new FormData(e.currentTarget);
    const titulo = formData.get('titulo')?.toString().trim() ?? '';
    const id_autor = formData.get('id_autor')?.toString().trim() ?? '';
    const id_editorial = formData.get('id_editorial')?.toString().trim() ?? '';
    const id_categoria = formData.get('id_categoria')?.toString().trim() ?? '';
    const isbn = formData.get('isbn')?.toString().trim() ?? '';
    const fecha_publicacion = formData.get('fecha_publicacion')?.toString().trim() ?? '';

    try {
      const actualizado = await putClient<Libro>(`libros/${editando.id}`, { titulo, id_autor, id_editorial, id_categoria, isbn, fecha_publicacion });
      setLibros(libros.map((l) => (l.id === actualizado.id ? actualizado : l)));
      setEditando(null);
    } catch (err) {
      alert('Error al actualizar libro');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Libros</h2>

      {/* FORMULARIO NUEVO */}
      <h3 style={{ marginTop: '1rem' }}>Agregar nuevo libro</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="titulo" placeholder="Título" required style={inputStyle} />
        <input name="id_autor" placeholder="ID Autor" required style={inputStyle} />
        <input name="id_editorial" placeholder="Editorial" required style={inputStyle} />
        <input name="id_categoria" placeholder="Categoría" required style={inputStyle} />
        <input name="isbn" placeholder="ISBN" required style={inputStyle} />
        <input name="fecha_publicacion" placeholder="Fecha de Publicación" required type="date" style={inputStyle} />
        <button type="submit" style={submitButtonStyle}>Guardar libro</button>
      </form>

      {/* FORMULARIO DE EDICIÓN */}
      {editando && (
        <form onSubmit={handleEditLibro} style={editFormStyle}>
          <h3>Editar libro</h3>
          <input name="titulo" defaultValue={editando.titulo} required style={inputStyle} />
          <input name="id_autor" defaultValue={editando.id_autor} required style={inputStyle} />
          <input name="id_editorial" defaultValue={editando.id_editorial} required style={inputStyle} />
          <input name="id_categoria" defaultValue={editando.id_categoria} required style={inputStyle} />
          <input name="isbn" defaultValue={editando.isbn} required style={inputStyle} />
          <input name="fecha_publicacion" defaultValue={editando.fecha_publicacion} required type="date" style={inputStyle} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" style={saveButtonStyle}>Guardar cambios</button>
            <button type="button" onClick={() => setEditando(null)} style={cancelButtonStyle}>Cancelar</button>
          </div>
        </form>
      )}

      {/* TABLA */}
      <Table data={libros} columns={columns} filterField="titulo" renderRow={(libro: Libro) => (
        <tr key={libro.id} style={rowStyle}>
          <td style={cellStyle}>{libro.id}</td>
          <td style={cellStyle}>{libro.titulo}</td>
          <td style={cellStyle}>{libro.autor_nombre}</td>
          <td style={cellStyle}>{libro.editorial_nombre}</td>
          <td style={cellStyle}>{libro.categoria_nombre}</td>
          <td style={cellStyle}>{libro.isbn}</td>
          <td style={cellStyle}>{libro.fecha_publicacion}</td>
          <td style={cellStyle}>
            <button onClick={() => setEditando(libro)} style={editButtonStyle}>Editar</button>
            <button onClick={async () => {
              if (confirm(`¿Eliminar el libro "${libro.titulo}"?`)) {
                try {
                  await deleteClient(`libros/${libro.id}`);
                  setLibros(libros.filter((l) => l.id !== libro.id));
                } catch (err) {
                  alert('Error al eliminar libro');
                }
              }
            }} style={deleteButtonStyle}>Eliminar</button>
          </td>
        </tr>
      )} />
    </div>
  );
}

// ✅ Estilos ajustados para reducir espacios y centrar contenido
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
  marginRight: '0.5rem',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
};