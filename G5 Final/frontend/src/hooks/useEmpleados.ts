import { useEffect, useState } from 'react';
import { fetchClient, postClient, putClient, deleteClient } from '../utils/fetchClient';

export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cargo: string;
}

export function useEmpleados() {
  const [data, setData] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const empleados = await fetchClient<Empleado[]>('empleados');
      setData(empleados);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createEmpleado = async (empleadoData: Omit<Empleado, 'id'>) => {
    try {
      const newEmpleado = await postClient<Empleado>('empleados', empleadoData);
      setData(prev => [...prev, newEmpleado]);
      return newEmpleado;
    } catch (err) {
      throw err;
    }
  };

  const updateEmpleado = async (id: number, empleadoData: Partial<Empleado>) => {
    try {
      const updatedEmpleado = await putClient<Empleado>(`empleados/${id}`, empleadoData);
      setData(prev => prev.map(e => e.id === id ? updatedEmpleado : e));
      return updatedEmpleado;
    } catch (err) {
      throw err;
    }
  };

  const deleteEmpleado = async (id: number) => {
    try {
      await deleteClient(`empleados/${id}`);
      setData(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { 
    data, 
    loading, 
    error,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    reload: loadData
  };
}