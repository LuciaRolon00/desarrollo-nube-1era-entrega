import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DescJuego() {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuego = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://12.0.0.1:8000/api/juegos/${id}/`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Juego no encontrado');
          }
          throw new Error('No se pudo cargar la información del juego.');
        }

        const data = await response.json();
        setJuego(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJuego();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-white text-xl p-8">Cargando detalles del juego...</p>;
  }

  // Si no se encuentra el juego o hay otro error, se muestra un msj
  if (error) {
    return (
      <div className="container mx-auto p-8 text-white text-center">
        <h2 className="text-2xl text-red-400">Error: {error}</h2>
        <Link to="/" className="text-indigo-400 hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Imagen del juego */}
        <div className="w-full flex justify-center">
          <img
            src={juego.imagen}
            alt={`Portada de ${juego.titulo}`}
            className="rounded-lg shadow-lg shadow-purple-900/50 w-full max-w-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold mb-2">{juego.titulo}</h1>

          <div className="mb-4">
            <p className="text-yellow-400 text-2xl">
              {'⭐'.repeat(juego.estrellas)}
            </p>
          </div>

          {/* Descripción */}
          <div className="bg-[#5B5283] bg-opacity-50 p-4 rounded-lg border border-purple-500/50">
            <p className="text-lg text-gray-200 leading-relaxed">
              {juego.descripcion}
            </p>
          </div>

          <hr className="my-4 border-t border-slate-400/30" />

          <div className="mt-4">
            <Link to="/juegos" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer">
              ← Volver al Listado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};