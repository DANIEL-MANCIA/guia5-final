from app import create_app
from app.models.db import Database

app = create_app()

if __name__ == '__main__':
    # Inicializar el pool de conexiones
    Database.initialize()
    
    # Mostrar endpoints disponibles
    print("Servidor backend escuchando en http://localhost:5000")
    print("\nEndpoints disponibles:")
    print("- Empleados: http://localhost:5000/empleados")
    print("- Clientes: http://localhost:5000/clientes")
    print("- Autores: http://localhost:5000/autores")
    print("- Libros: http://localhost:5000/libros")
    
    app.run(debug=True)