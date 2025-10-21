// Componente de la barra de navegación
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

export default function Nav() {
  const { user, logout, isAuthenticated } = useAuth(); 

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-[#696180] p-4">
      {/* Logo o título */}
      <Link to="/" className="flex items-center gap-4 no-underline">
        <img src="/img/logo.jpg" alt="Logo" className="h-20 w-20 rounded-full object-cover" />
        <span className="text-2xl font-bold text-white">
          SPACE REVIEWS
        </span>
      </Link>

      {/* Botón hamburguesa */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú de navegación"
      >
        ☰
      </button>

      {/* Links de escritorio */}
      <div className="hidden md:flex gap-2 items-center">
        <Link to="/" className="bg-black text-white py-2 px-4 rounded-full hover:bg-[#bfaaf3] transition-colors cursor-pointer ">INICIO</Link>
        <Link to="/contacto" className="bg-black text-white py-2 px-4 rounded-full hover:bg-[#bfaaf3] transition-colors cursor-pointer">CONTACTO</Link>

        {isAuthenticated ? (
          <>
            <Link to="/juegos" className="bg-black text-white py-2 px-4 rounded-full hover:bg-[#bfaaf3] transition-colors cursor-pointer">JUEGOS</Link>
            <span className="text-white font-semibold ml-4">Hola, {user?.email}</span>
            <button onClick={logout} className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors cursor-pointer">
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-black text-white py-2 px-4 rounded-full hover:bg-[#bfaaf3] transition-colors cursor-pointer">
              LOGIN
            </Link>
            <Link to="/registro" className="bg-black text-white py-2 px-4 rounded-full hover:bg-[#bfaaf3] transition-colors cursor-pointer">
              REGISTRO
            </Link>
          </>
        )}

        {/* Buscador */}
        <input
          type="text"
          placeholder="🔍 Buscar"
          className="bg-black text-white p-2 rounded-full ml-5"
        />
      </div>

      {/* Menú desplegable en mobile */}
      {isOpen && (
        <div className="absolute top-28 left-0 w-full bg-gray-900 flex flex-col items-center gap-4 py-4 md:hidden text-white">
          <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/juegos" onClick={() => setIsOpen(false)}>Juegos</Link>
              <button onClick={() => {
                logout();
                setIsOpen(false);
              }}
                className="text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/registro" onClick={() => setIsOpen(false)}>
                Registro
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}