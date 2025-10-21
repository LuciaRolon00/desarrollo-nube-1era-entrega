import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white text-center p-6">
      <div className="text-7xl mb-4">🚀</div>

      <h1 className="text-6xl font-extrabold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">¡Houston, tenemos un problema!</h2>

      <p className="mb-6 text-gray-400 max-w-md">
        La página que buscás se perdió en el espacio profundo 🌌.  
        Puede que haya sido movida, eliminada o nunca existió.
      </p>

      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        aria-label="Volver al inicio"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}