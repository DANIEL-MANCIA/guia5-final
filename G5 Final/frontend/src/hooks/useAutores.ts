import { useEffect, useState } from 'react';
import { fetchClient } from '../utils/fetchClient';
import type { Autor } from '../types/Autor';

export function useAutores() {
  const [data, setData] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const autores = await fetchClient<Autor[]>('autores');
        setData(autores);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading, error };
}