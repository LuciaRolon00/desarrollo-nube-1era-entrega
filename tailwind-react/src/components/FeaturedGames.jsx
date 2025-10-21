import { videojuegos } from '../data/videojuegos.js';
import JuegoCard from './JuegoCard.jsx';

const FeaturedGames = () => {
  const juegosDestacados = videojuegos.slice(0, 4);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 max-w-7xl'>
      {juegosDestacados.map((juego) => (
        <JuegoCard key={juego.id} juego={juego} />
      ))}
    </div>
  );
};

export default FeaturedGames;