import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';

/**
 * PrivateRoute — wraps any route that requires authentication.
 * Alerts user via SweetAlert if no user session is found in AuthContext.
 */
export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: 'Inicio de sesión requerido',
        text: 'Debes iniciar sesión para acceder a esta sección.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#4b5563',
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location }, replace: true });
        } else {
          navigate('/', { replace: true });
        }
      });
    }
  }, [user, navigate, location]);

  if (!user) {
    return null;
  }

  return children;
}
