import { Navigate, useLocation } from 'react-router-dom';

/**
 * PrivateRoute — wraps any route that requires authentication.
 * Redirects to /login if no user session is found in localStorage.
 */
export default function PrivateRoute({ children }) {
  const location = useLocation();
  const user = localStorage.getItem('user');

  if (!user) {
    // Redirect to login, preserving the attempted URL so we can return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
