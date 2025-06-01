from flask import Blueprint, request, jsonify
from ..models.db import query

libros_bp = Blueprint('libros', __name__)

@libros_bp.route('/', methods=['GET'])
def get_libros():
    try:
        query_sql = """
        SELECT 
            libros.id, 
            libros.titulo, 
            autores.nombre AS autor_nombre, 
            editoriales.nombre AS editorial_nombre, 
            categorias.nombre AS categoria_nombre, 
            libros.isbn, 
            libros.fecha_publicacion
        FROM libros
        JOIN autores ON libros.id_autor = autores.id
        JOIN editoriales ON libros.id_editorial = editoriales.id
        JOIN categorias ON libros.id_categoria = categorias.id
        ORDER BY libros.id
        """
        result = query(query_sql)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@libros_bp.route('/', methods=['POST'])
def create_libro():
    try:
        data = request.json
        query_sql = """
        INSERT INTO libros (titulo, id_autor, id_editorial, id_categoria, id_ubicacion, fecha_publicacion, isbn)
        VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id
        """
        libro_id = execute_query(query_sql, (data['titulo'], data['id_autor'], data['id_editorial'], 
                                             data['id_categoria'], data['id_ubicacion'], 
                                             data['fecha_publicacion'], data['isbn']))
        return jsonify({'message': 'Libro creado', 'id': libro_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 📌 Actualizar un libro
@libros_bp.route('/<int:libro_id>', methods=['PUT'])
def update_libro(libro_id):
    try:
        data = request.json
        query_sql = """
        UPDATE libros SET titulo=%s, id_autor=%s, id_editorial=%s, id_categoria=%s, 
        id_ubicacion=%s, fecha_publicacion=%s, isbn=%s WHERE id=%s
        """
        execute_query(query_sql, (data['titulo'], data['id_autor'], data['id_editorial'], 
                                  data['id_categoria'], data['id_ubicacion'], 
                                  data['fecha_publicacion'], data['isbn'], libro_id))
        return jsonify({'message': 'Libro actualizado'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 📌 Eliminar un libro
@libros_bp.route('/<int:libro_id>', methods=['DELETE'])
def delete_libro(libro_id):
    try:
        execute_query("DELETE FROM libros WHERE id=%s", (libro_id,))
        return jsonify({'message': 'Libro eliminado'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Aquí puedes agregar más endpoints para libros según necesites