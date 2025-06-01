/*import { useEffect, useState } from 'react';
import { fetchClient, postClient, putClient, deleteClient } from '../utils/fetchClient';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export function useClientes() {
  const [data, setData] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const clientes = await fetchClient<Cliente[]>('clientes');
      setData(clientes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createCliente = async (clienteData: Omit<Cliente, 'id'>) => {
    try {
      const newCliente = await postClient<Cliente>('clientes', clienteData);
      setData(prev => [...prev, newCliente]);
      return newCliente;
    } catch (err) {
      throw err;
    }
  };

  const updateCliente = async (id: number, clienteData: Partial<Cliente>) => {
    try {
      const updatedCliente = await putClient<Cliente>(`clientes/${id}`, clienteData);
      setData(prev => prev.map(c => c.id === id ? updatedCliente : c));
      return updatedCliente;
    } catch (err) {
      throw err;
    }
  };

  const deleteCliente = async (id: number) => {
    try {
      await deleteClient(`clientes/${id}`);
      setData(prev => prev.filter(c => c.id !== id));
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
    createCliente,
    updateCliente,
    deleteCliente,
    reload: loadData
  };
}*/

import { useEffect, useState } from 'react';
import { fetchClient, postClient, putClient, deleteClient } from '../utils/fetchClient';
import type { Cliente } from '../types/Cliente';

export function useClientes() {
  const [data, setData] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const clientes = await fetchClient<Cliente[]>('clientes');
      setData(clientes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createCliente = async (clienteData: Omit<Cliente, 'id'>) => {
  try {
    const newCliente = await postClient<Cliente>('clientes', clienteData);
    return newCliente;
  } catch (err) {
    throw err;
  }
};

const updateCliente = async (id: string, clienteData: Partial<Cliente>) => {
  try {
    const updatedCliente = await putClient<Cliente>(`clientes/${id}`, clienteData);
    return updatedCliente;
  } catch (err) {
    throw err;
  }
};

  const deleteCliente = async (id: string) => {
    try {
      await deleteClient(`clientes/${id}`);
      setData(prev => prev.filter(c => c.id !== id));
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
    createCliente,
    updateCliente,
    deleteCliente,
    reload: loadData
  };
}