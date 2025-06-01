import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        background: '#1a2634',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '250px',
          backgroundColor: '#15202b',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.6rem', color: '#4fd1c5', marginBottom: '0.5rem' }}>
          Inicia sesión
        </h1>
        <p style={{ color: '#a0b1c5', marginBottom: '2rem' }}>
          Ingresa con tu cuenta de Google
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                login(credentialResponse.credential);
                navigate('/');
              }
            }}
            onError={() => {
              alert('Error al iniciar sesión');
            }}
            theme="filled_blue"
            size="large"
            width="100%"
          />
        </div>

        <footer style={{ fontSize: '0.85rem', color: '#a0b1c5' }}>
          © {new Date().getFullYear()} Biblioteca - DM • Acceso Reservado
        </footer>
      </div>
    </div>
  );
}