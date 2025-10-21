import FeaturedGames from '../components/FeaturedGames';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center pt-8 pb-16"> 
      {/* Banner de bienvenida */}
      <section className="text-center mb-12 p-8 bg-gray-800 bg-opacity-70 rounded-lg max-w-4xl">
        <h1 className="text-5xl font-bold text-white mb-4">Bienvenido a <i>SPACE REVIEWS</i>!</h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Explora los universos más fascinantes y comparte tus opiniones sobre los mejores videojuegos de la galaxia.🌌🌌🌌
        </p>
        <p className="text-lg text-gray-400 mt-4">
          ¡Únete a nuestra comunidad intergaláctica de gamers!👽🛸
        </p>
      </section>

      <h2 className="text-4xl font-bold text-white mb-8">Nuestros Juegos Destacados</h2>

      <FeaturedGames />
    </div>
  );
};

export default HomePage;