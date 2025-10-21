// Componente para mostrar las cards de los juegos
import { useState } from "react";
import { Link } from "react-router-dom";

export default function JuegoCard({ juego }) {
  const [favorito, setFavorito] = useState(false);

  const handleToggleFavorito = () => {
    setFavorito(!favorito);
  };

  const textoBoton = favorito ? "Quitar de Favoritos 💔" : "Agregar a Favoritos ❤️";
  const clasesBoton = favorito
    ? "bg-red-500 hover:bg-red-600"
    : "bg-yellow-400 hover:bg-yellow-500";

  return (
    // Tarjeta del juego
    <article className="overflow-hidden rounded-2xl bg-[#484876] flex flex-col">
      {/* Imagen del juego linkeada a detalles */}
      <Link to={`/juego/${juego.id}`}>
        <img
          src={juego.imagen}
          alt={`Portada del juego ${juego.titulo}`}
          className="h-180 w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col flex-grow p-4 text-white">
        {/* Estrellas */}
        <div className="mb-2">
          <p
            className="text-yellow-400 text-lg"
            aria-label={`Calificación: ${juego.estrellas} de 5 estrellas`}
          >
            {"⭐".repeat(juego.estrellas)}
          </p>
        </div>

        {/* Título */}
        <h4 className="text-xl font-bold leading-snug mb-2">{juego.titulo}</h4>

        {/* Descripción */}
        <p className="text-sm text-gray-300 flex-grow mb-4">{juego.descripcion}</p>

        <hr className="my-1 border-t border-slate-300/50" />

        {/* Botones */}
        <div className="pt-2 flex justify-between items-center">
          <button
            type="button"
            className={`w-48 rounded-lg px-3 py-2 text-sm font-bold text-black transition-colors ${clasesBoton}`}
            onClick={handleToggleFavorito}
            aria-label={textoBoton}
          >
            {textoBoton}
          </button>

          <Link
            to={`/juego/${juego.id}`}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            Ver Detalles →
          </Link>
        </div>
      </div>
    </article>
  );
}