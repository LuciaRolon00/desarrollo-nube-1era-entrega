import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";

// Imports de páginas y componentes
import HomePage from './pages/HomePage.jsx';
import DescJuego from './pages/DescJuego.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Contacto from './pages/Contacto.jsx';
import Juegos from './pages/Juegos.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/juego/:id" element={<DescJuego />} />
        <Route
          path="/juegos"
          element={
            <ProtectedRoute>
              <Juegos />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;