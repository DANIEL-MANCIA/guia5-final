/*export interface Libro {
  id: number;
  titulo: string;
  id_autor: string;
  autor_nombre?: string;
  autor_apellido?: string;
  id_editorial?: string;
  id_categoria?: string;
  id_ubicacion?: string;
  fecha_publicacion?: string;
  isbn?: string;
}*/

export interface Libro {
  id: number;
  titulo: string;
  id_autor: string;
  autor_nombre?: string; // ✅ Nombre del autor
  autor_apellido?: string; // ✅ Apellido del autor
  id_editorial?: string;
  editorial_nombre?: string; // ✅ Nombre de la editorial
  id_categoria?: string;
  categoria_nombre?: string; // ✅ Nombre de la categoría
  id_ubicacion?: string;
  fecha_publicacion?: string;
  isbn?: string;
}