import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";
import { useMemo } from "react";

const FeaturedSection = () => {
  const { shows } = useAppContext();
  const navigate = useNavigate();

  console.log("shows from context:", shows);

  // Extract movies correctly
  const movies = useMemo(() => {
    // If backend returned { success, shows: [...] }
    if (Array.isArray(shows?.shows)) {
      return shows.shows;
    }
    // If backend returned direct array
    if (Array.isArray(shows)) {
      return shows;
    }
    return [];
  }, [shows]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          View All{" "}
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.slice(0, 4).map((movie) => (
            <MovieCard key={movie._id || movie.id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            No movies found.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
