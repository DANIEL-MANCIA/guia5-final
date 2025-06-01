import { postClient, fetchClient, putClient, deleteClient } from './fetchClient';

export interface Libro {
  id: number;
  titulo: string;
  autor_id: number;
  autor?: string; // Opcional para cuando se hace JOIN
  anio: number;
  genero?: string;
  isbn?: string;
  editorial?: string;
}

export async function fetchLibros(): Promise<Libro[]> {
  return fetchClient<Libro[]>('libros');
}

export async function createLibro(libro: Omit<Libro, 'id'>): Promise<Libro> {
  return postClient<Libro>('libros', libro);
}

export async function updateLibro(id: number, libro: Partial<Libro>): Promise<Libro> {
  return putClient<Libro>(`libros/${id}`, libro);
}

export async function deleteLibro(id: number): Promise<void> {
  return deleteClient(`libros/${id}`);
}