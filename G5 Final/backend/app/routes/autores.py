from flask import Blueprint, request, jsonify
from ..models.db import query

autores_bp = Blueprint('autores', __name__)

@autores_bp.route('/', methods=['GET'])
def get_autores():
    try:
        result = query('SELECT * FROM autores ORDER BY id')
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Aquí puedes agregar más endpoints para autores hazmelos