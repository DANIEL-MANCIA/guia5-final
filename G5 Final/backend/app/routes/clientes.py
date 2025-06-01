from flask import Blueprint, request, jsonify
from ..models.db import query

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/', methods=['GET'])
def get_clientes():
    try:
        result = query('SELECT id, nombre, apellido, correo, telefono, direccion FROM clientes ORDER BY nombre')
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@clientes_bp.route('/', methods=['POST'])
def create_cliente():
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    correo = data.get('correo')
    telefono = data.get('telefono')
    direccion = data.get('direccion')
    
    if not all([nombre, apellido, correo, telefono, direccion]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400

    try:
        result = query(
            'INSERT INTO clientes (nombre, apellido, correo, telefono, direccion) VALUES (%s, %s, %s, %s, %s) RETURNING id, nombre, apellido, correo, telefono, direccion',
            (nombre, apellido, correo, telefono, direccion)
        )
        return jsonify(result[0] if result else None), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@clientes_bp.route('/<string:id>', methods=['PUT'])
def update_cliente(id):
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    correo = data.get('correo')
    telefono = data.get('telefono')
    direccion = data.get('direccion', '')
    
    if not all([nombre, apellido, correo, telefono, direccion]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400
    
    try:
        result = query(
            '''UPDATE clientes 
               SET nombre = %s, apellido = %s, correo = %s, telefono = %s, direccion = %s 
               WHERE id = %s 
               RETURNING id, nombre, apellido, correo, telefono, direccion''',
            (nombre, apellido, correo, telefono, direccion, id)
        )
        if not result:
            return jsonify({'error': 'Cliente no encontrado'}), 404
        return jsonify(result[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@clientes_bp.route('/<string:id>', methods=['DELETE'])
def delete_cliente(id):
    try:
        result = query(
            'DELETE FROM clientes WHERE id = %s RETURNING id',
            (id,)
        )
        if not result:
            return jsonify({'error': 'Cliente no encontrado'}), 404
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500