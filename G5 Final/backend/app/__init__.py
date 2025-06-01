from flask import Flask
from flask_cors import CORS
from .routes.clientes import clientes_bp
from .routes.empleados import empleados_bp
from .routes.autores import autores_bp
from .routes.libros import libros_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Registrar blueprints (rutas)
    app.register_blueprint(clientes_bp, url_prefix='/clientes')
    app.register_blueprint(empleados_bp, url_prefix='/empleados')
    app.register_blueprint(autores_bp, url_prefix='/autores')
    app.register_blueprint(libros_bp, url_prefix='/libros')
    
    return app
    