import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public-only routes: redirect to home if already logged in */}
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              <PublicRoute>
                <VerifyEmail />
              </PublicRoute>
            }
          />

          {/* Protected routes: redirect to login if not authenticated */}
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="catalogo" element={<PrivateRoute><Catalogo /></PrivateRoute>} />
          <Route path="carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
          <Route path="contacto" element={<PrivateRoute><Contacto /></PrivateRoute>} />
          <Route path="perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;