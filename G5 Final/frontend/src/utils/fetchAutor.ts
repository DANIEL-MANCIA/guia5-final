import { postClient, fetchClient, putClient, deleteClient } from './fetchClient';

export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
  fechaNacimiento?: string;
  biografia?: string;
}

export async function fetchAutores(): Promise<Autor[]> {
  return fetchClient<Autor[]>('autores');
}

export async function createAutor(autor: Omit<Autor, 'id'>): Promise<Autor> {
  return postClient<Autor>('autores', autor);
}

export async function updateAutor(id: number, autor: Partial<Autor>): Promise<Autor> {
  return putClient<Autor>(`autores/${id}`, autor);
}

export async function deleteAutor(id: number): Promise<void> {
  return deleteClient(`autores/${id}`);
}