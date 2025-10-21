import { useFetchJuegos } from '../hooks/useFetchJuegos';
import ItemListContainer from '../components/ItemListContainer';

const Juegos = () => {
  const { juegos, loading, error } = useFetchJuegos();

  if (loading) return <div className="container mx-auto my-5 text-center text-white"><p>Cargando juegos...</p></div>;
  if (error) return <div className="container mx-auto my-5 text-center text-red-400"><p>Error: {error}</p></div>;

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-center text-4xl font-bold text-white mb-8">Nuestros Juegos</h1>
      <ItemListContainer juegos={juegos} /> 
    </div>
  );
};

export default Juegos;