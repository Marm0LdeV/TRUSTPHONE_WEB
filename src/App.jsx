import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App