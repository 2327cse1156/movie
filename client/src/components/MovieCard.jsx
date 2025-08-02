import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between p-3 bg-gray-300 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
      <img
        onClick={() => {
          navigate(`/movies/${movie.id}`); scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
        alt=""
      />
      <p className="truncate mt-2 font-semibold">{movie.title}</p>

      <p className="text-sm mt-2 text-gray-400">
        {new Date(movie.release_date).getFullYear()} . {movie.genres.slice(0, 2).map(genre => genre.name).join(" | ")} . {timeFormat(movie.runtime)}
      </p>

      <div className="flex items-center justify-between mt-4 pb-3">
        <button onClick={() => {
          navigate(`/movies/${movie.id}`); scrollTo(0, 0);
        }} className="px-4 py-2 bg-primary text-xs hover:bg-primary-dull transition font-medium cursor-pointer rounded-full">Buy Tickets</button>
        <p className="flex items-center gap-1 text-sm mt-1 pr-1 text-gray-500">
          <StarIcon className="w-4 h-4 text-primary fill-primary"/>
          {movie.vote_average.toFixed(1)}

        </p>
      </div>
    </div>
  );
};

export default MovieCard;
