import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../assets/assets";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    setShow({
      movie: show,
      dateTime: dummyDateTimeData,
    });
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const navigate = useNavigate();

  return show ? (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white px-6 md:px-12 lg:px-20 pt-28 pb-16">
      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        {/* Poster */}
        <img
          src={show.movie.poster_path}
          alt=""
          className="rounded-lg shadow-lg w-full md:w-1/3 object-cover"
        />

        {/* Details Section */}
        <div className="flex-1">
          <BlurCircle
            top="-100px"
            left="-100px"
            size="300px"
            color="rgba(255,0,0,0.3)"
            blur="blur(80px)"
            animate
          />

          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            ENGLISH
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <StarIcon className="text-yellow-400 w-5 h-5" />
            <span className="font-semibold">
              {show.movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">User Rating</span>
          </div>

          <p className="text-gray-300 mb-4">{show.movie.overview}</p>

          <p className="text-sm text-gray-400 mb-6">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full transition">
              <PlayCircleIcon size={20} /> Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition"
            >
              Buy Tickets
            </a>
            <button className="p-2 border border-gray-500 rounded-full hover:bg-gray-800 transition">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className="text-2xl font-bold mt-16 mb-6">🎭 Your Favourite Cast</p>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {show.movie.casts.slice(0, 12).map((cast, index) => (
          <div
            key={index}
            className="bg-gray-800/40 rounded-lg p-3 text-center hover:bg-gray-700/70 hover:scale-105 transition-all duration-300"
          >
            <img
              src={cast.profile_path}
              alt=""
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
            />
            <p className="font-medium">{cast.name}</p>
          </div>
        ))}
      </div>

      {/* Date Selection */}
      <div className="mt-16">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* Similar Movies Section */}
      <div className="mt-20">
        <p className="text-2xl font-bold mb-6">🍿 You May Also Like</p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              navigate(`/movies`);
              scrollTo(0, 0);
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-lg rounded-full shadow-lg transition"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
