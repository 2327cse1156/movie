import { useState } from "react";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { Heart } from "lucide-react";

const Favourite = () => {
  const [favourites, setFavourites] = useState(dummyShowsData);

  // Toggle favourite state
  const toggleFavourite = (movieId) => {
    setFavourites((prev) =>
      prev.filter((movie) => movie._id !== movieId)
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Background Blur */}
      <BlurCircle
        top="-50px"
        left="-50px"
        size="300px"
        color="rgba(255,0,0,0.3)"
        blur="blur(80px)"
        animate
      />
      <BlurCircle
        top="300px"
        right="-100px"
        size="400px"
        color="rgba(0,150,255,0.3)"
        blur="blur(80px)"
        animate
      />

      {/* Header */}
      <div className="relative z-10 pt-28 px-6 md:px-16 lg:px-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-3">
          ❤️ Your Favourites
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-10">
          Manage and watch your saved movies anytime!
        </p>

        {/* Grid */}
        {favourites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favourites.map((movie) => (
              <div key={movie._id} className="relative group">
                <MovieCard movie={movie} />

                {/* Heart Icon Overlay */}
                <button
                  onClick={() => toggleFavourite(movie._id)}
                  className="absolute top-3 right-3 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Heart className="text-red-500 fill-red-500 w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-lg italic">
            You haven’t added any favourites yet. ❤️
          </p>
        )}
      </div>
    </section>
  );
};

export default Favourite;
