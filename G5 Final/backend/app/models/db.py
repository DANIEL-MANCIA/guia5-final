import psycopg2
from psycopg2 import pool

class Database:
    __connection_pool = None
    
    @classmethod
    def initialize(cls):
        cls.__connection_pool = pool.SimpleConnectionPool(
            1, 10,
            user='postgres',
            password='SAN24',
            host='localhost',
            port='5432',
            database='biblioteca-lab'
        )
    
    @classmethod
    def get_connection(cls):
        return cls.__connection_pool.getconn()
    
    @classmethod
    def return_connection(cls, connection):
        cls.__connection_pool.putconn(connection)
    
    @classmethod
    def close_all_connections(cls):
        cls.__connection_pool.closeall()

def query(sql, params=None):
    conn = Database.get_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(sql, params)
        if sql.strip().upper().startswith('SELECT'):
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in result]
        elif sql.strip().upper().startswith(('INSERT', 'UPDATE', 'DELETE')):
            conn.commit()
            if sql.strip().upper().startswith('INSERT') and 'RETURNING' in sql.upper():
                result = cursor.fetchone()
                columns = [desc[0] for desc in cursor.description]
                return dict(zip(columns, result)) if result else None
            return cursor.rowcount
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        Database.return_connection(conn)