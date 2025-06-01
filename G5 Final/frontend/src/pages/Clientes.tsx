import { useClientes } from '../hooks/useClientes';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import type { Cliente } from '../types/Cliente';

export default function Clientes() {
  const { 
    data, 
    loading, 
    error, 
    createCliente, 
    updateCliente, 
    deleteCliente,
  } = useClientes();
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Actualizar lista de clientes cuando cambian los datos
  useEffect(() => {
    setClientes([...data].sort((a, b) => a.nombre.localeCompare(b.nombre)));
  }, [data]);

  // Validación de email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Manejar creación de cliente
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const clienteData = {
      nombre: formData.get('nombre')?.toString().trim() || '',
      apellido: formData.get('apellido')?.toString().trim() || '',
      correo: formData.get('correo')?.toString().trim() || '',
      telefono: formData.get('telefono')?.toString().trim() || '',
      direccion: formData.get('direccion')?.toString().trim() || ''
    };

    // Validaciones
    if (!clienteData.nombre || !clienteData.apellido || !clienteData.correo) {
      setFormError('Nombre, apellido y correo son campos obligatorios');
      return;
    }

    if (!validateEmail(clienteData.correo)) {
      setFormError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      const nuevoCliente = await createCliente(clienteData);
      setClientes(prev => [...prev, nuevoCliente].sort((a, b) => a.nombre.localeCompare(b.nombre)));
      setSuccessMessage('Cliente creado exitosamente');
      e.currentTarget.reset();
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error al crear cliente:', err);
      setFormError(err instanceof Error ? err.message : 'Error al crear cliente');
    }
  };

  // Manejar actualización de cliente
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editando) return;
    setFormError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const clienteData = {
      nombre: formData.get('nombre')?.toString().trim() || editando.nombre,
      apellido: formData.get('apellido')?.toString().trim() || editando.apellido,
      correo: formData.get('correo')?.toString().trim() || editando.correo,
      telefono: formData.get('telefono')?.toString().trim() || editando.telefono || '',
      direccion: formData.get('direccion')?.toString().trim() || editando.direccion || ''
    };

    // Validaciones
    if (!clienteData.nombre || !clienteData.apellido || !clienteData.correo) {
      setFormError('Nombre, apellido y correo son campos obligatorios');
      return;
    }

    if (!validateEmail(clienteData.correo)) {
      setFormError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      const updatedCliente = await updateCliente(editando.id, clienteData);
      setClientes(prev => 
        prev.map(c => c.id === updatedCliente.id ? updatedCliente : c)
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
      );
      setSuccessMessage('Cliente actualizado exitosamente');
      setEditando(null);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error al actualizar cliente:', err);
      setFormError(err instanceof Error ? err.message : 'Error al actualizar cliente');
    }
  };

  // Manejar eliminación de cliente
  const handleDelete = async (id: string) => {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (!confirmar) return;
    
    try {
      await deleteCliente(id);
      setClientes(prev => prev.filter(c => c.id !== id));
      setSuccessMessage('Cliente eliminado exitosamente');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      setFormError('Error al eliminar cliente');
    }
  };

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>Error al cargar clientes: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Listado de Clientes</h2>

      {/* Mensajes de éxito y error */}
      {successMessage && (
        <div style={{ 
          color: 'green', 
          marginBottom: '1rem',
          padding: '0.5rem',
          backgroundColor: '#e6ffe6',
          borderRadius: '4px'
        }}>
          {successMessage}
        </div>
      )}
      
      {formError && (
        <div style={{ 
          color: 'red', 
          marginBottom: '1rem',
          padding: '0.5rem',
          backgroundColor: '#ffe6e6',
          borderRadius: '4px'
        }}>
          {formError}
        </div>
      )}

      {/* Formulario de creación */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Agregar nuevo cliente</h3>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input 
            name="nombre" 
            placeholder="Nombre*" 
            required 
            style={inputStyle} 
            pattern="[A-Za-zÁ-ÿ ]+" 
            title="Solo letras y espacios" 
          />
          <input 
            name="apellido" 
            placeholder="Apellido*" 
            required 
            style={inputStyle} 
            pattern="[A-Za-zÁ-ÿ ]+" 
            title="Solo letras y espacios" 
          />
          <input 
            name="correo" 
            placeholder="Correo electrónico*" 
            required 
            type="email" 
            style={inputStyle} 
          />
          <input 
            name="telefono" 
            placeholder="Teléfono" 
            style={inputStyle} 
            pattern="[0-9+\- ]+" 
            title="Solo números, +, - y espacios" 
          />
          <input 
            name="direccion" 
            placeholder="Dirección" 
            style={inputStyle} 
          />
          <button type="submit" style={submitButtonStyle}>
            Guardar cliente
          </button>
        </form>
      </div>

      {/* Formulario de edición */}
      {editando && (
        <div style={{ 
          marginBottom: '2rem', 
          backgroundColor: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          <h3>Editando cliente: {editando.nombre} {editando.apellido}</h3>
          <form onSubmit={handleEditSubmit} style={formStyle}>
            <input 
              name="nombre" 
              defaultValue={editando.nombre} 
              required 
              style={inputStyle} 
              pattern="[A-Za-zÁ-ÿ ]+" 
              title="Solo letras y espacios" 
            />
            <input 
              name="apellido" 
              defaultValue={editando.apellido} 
              required 
              style={inputStyle} 
              pattern="[A-Za-zÁ-ÿ ]+" 
              title="Solo letras y espacios" 
            />
            <input 
              name="correo" 
              defaultValue={editando.correo} 
              required 
              type="email" 
              style={inputStyle} 
            />
            <input 
              name="telefono" 
              defaultValue={editando.telefono || ''} 
              style={inputStyle} 
              pattern="[0-9+\- ]+" 
              title="Solo números, +, - y espacios" 
            />
            <input 
              name="direccion" 
              defaultValue={editando.direccion || ''} 
              style={inputStyle} 
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={saveButtonStyle}>
                Guardar cambios
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setEditando(null);
                  setFormError(null);
                }} 
                style={cancelButtonStyle}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de clientes */}
      <Table
        data={clientes}
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Nombre', accessor: 'nombre' },
          { header: 'Apellido', accessor: 'apellido' },
          { header: 'Correo', accessor: 'correo' },
          { header: 'Teléfono', accessor: 'telefono' },
          { header: 'Dirección', accessor: 'direccion' },
          { header: 'Acciones', accessor: 'acciones' }
        ]}
        renderRow={(cliente: Cliente) => (
          <tr key={cliente.id} style={rowStyle}>
            <td style={cellStyle}>{cliente.id.substring(0, 8)}...</td>
            <td style={cellStyle}>{cliente.nombre}</td>
            <td style={cellStyle}>{cliente.apellido}</td>
            <td style={cellStyle}>{cliente.correo}</td>
            <td style={cellStyle}>{cliente.telefono || '-'}</td>
            <td style={cellStyle}>{cliente.direccion || '-'}</td>
            <td style={{ ...cellStyle, display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setEditando(cliente)} 
                style={editButtonStyle}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(cliente.id)} 
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

// Estilos (se mantienen igual)
const rowStyle: React.CSSProperties = {
  height: '40px', 
  textAlign: 'center',
};

const cellStyle: React.CSSProperties = {
  padding: '6px',
  textAlign: 'center',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '500px',
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const submitButtonStyle: React.CSSProperties = {
  padding: '0.6rem',
  backgroundColor: '#1abc9c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const saveButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const editButtonStyle: React.CSSProperties = {
  padding: '0.4rem 0.8rem',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '0.4rem 0.8rem',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};