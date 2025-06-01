from flask import Blueprint, request, jsonify
from ..models.db import query
from datetime import datetime

empleados_bp = Blueprint('empleados', __name__)

@empleados_bp.route('/', methods=['GET'])
def get_empleados():
    try:
        result = query('SELECT * FROM empleados ORDER BY apellido, nombre')
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@empleados_bp.route('/', methods=['POST'])
def create_empleado():
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    cargo = data.get('cargo')
    fecha_contratacion = data.get('fecha_contratacion')
    salario = data.get('salario')
    
    # Validar campos requeridos
    if not all([nombre, apellido, cargo, fecha_contratacion, salario]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400
    
    try:
        # Convertir fecha si es necesario
        if isinstance(fecha_contratacion, str):
            fecha_contratacion = datetime.strptime(fecha_contratacion, '%Y-%m-%d').date()
            
        result = query(
            '''INSERT INTO empleados (nombre, apellido, cargo, fecha_contratacion, salario) 
               VALUES (%s, %s, %s, %s, %s) RETURNING *''',
            (nombre, apellido, cargo, fecha_contratacion, salario)
        )
        return jsonify(result), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@empleados_bp.route('/<string:id>', methods=['PUT'])
def update_empleado(id):
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    cargo = data.get('cargo')
    fecha_contratacion = data.get('fecha_contratacion')
    salario = data.get('salario')
    
    # Validar campos requeridos
    if not all([nombre, apellido, cargo, fecha_contratacion, salario]):
        return jsonify({'error': 'Todos los campos son requeridos'}), 400
    
    try:
        # Convertir fecha si es necesario
        if isinstance(fecha_contratacion, str):
            fecha_contratacion = datetime.strptime(fecha_contratacion, '%Y-%m-%d').date()
            
        result = query(
            '''UPDATE empleados 
               SET nombre = %s, apellido = %s, cargo = %s, 
                   fecha_contratacion = %s, salario = %s 
               WHERE id = %s RETURNING *''',
            (nombre, apellido, cargo, fecha_contratacion, salario, id)
        )
        if not result:
            return jsonify({'error': 'Empleado no encontrado'}), 404
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@empleados_bp.route('/<string:id>', methods=['DELETE'])
def delete_empleado(id):
    try:
        result = query(
            'DELETE FROM empleados WHERE id = %s RETURNING *',
            (id,)
        )
        if not result:
            return jsonify({'error': 'Empleado no encontrado'}), 404
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500