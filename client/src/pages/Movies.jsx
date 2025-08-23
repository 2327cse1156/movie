import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { useAppContext } from "../context/AppContext";

const Movies = () => {
  const {shows} = useAppContext()
  return shows.length > 0 ?(
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Blur Background */}
      <BlurCircle top="-50px" left="-50px" size="300px" color="rgba(255,0,0,0.3)" blur="blur(80px)" animate />
      <BlurCircle top="300px" right="-100px" size="400px" color="rgba(0,150,255,0.3)" blur="blur(80px)" animate />

      {/* Page Heading */}
      <div className="relative z-10 pt-28 px-6 md:px-16 lg:px-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-10">
          🎬 Now Showing
        </h1>

        {/* Movies Grid */}
        {shows.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shows.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-lg">No movies available</p>
        )}
      </div>
    </section>
  ): (<div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold text-center ">No Movies Available</h1>
  </div>)
};

export default Movies;
