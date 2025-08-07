import { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/loading";
import Title from "../../components/admin/Title";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";

function AddShows() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlaying, setNowPlaying] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlaying(dummyShowsData);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const updatedTimes = prev[date].filter((t) => t !== time);
      if (updatedTimes.length === 0) {
        const { [date]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: updatedTimes };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlaying.length > 0 ? (
    <div className="p-4 space-y-6">
      <Title text1="Add" text2="Shows" />

      <p className="text-lg font-semibold">Now Playing Movies</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {nowPlaying.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie.id)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
              selectedMovie === movie.id ? "border-primary" : "border-transparent"
            } transition`}
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
                <StarIcon className="inline w-3 h-3 mr-1" />
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="p-2 text-sm space-y-1">
              <p className="font-semibold truncate">{movie.title}</p>
              <p>{movie.release_date}</p>
              <p className="text-xs">{kConverter(movie.vote_count)} Votes</p>
              {selectedMovie === movie.id && (
                <CheckIcon className="text-green-600 w-5 h-5" strokeWidth={2.5} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show Price Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Show Price</label>
        <div className="flex items-center gap-2">
          <span className="font-bold">{currency}</span>
          <input
            type="number"
            min={0}
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="px-3 py-2 rounded border focus:outline-none w-full max-w-xs"
          />
        </div>
      </div>

      {/* Date Time Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Select Date and Time</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="px-3 py-2 rounded border focus:outline-none w-full sm:max-w-xs"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary text-white px-4 py-2 rounded text-sm"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Selected Date-Time List */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date} className="space-y-1">
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded text-sm"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="bg-primary text-white px-6 py-2 rounded text-sm mt-4">
        Add Show
      </button>
    </div>
  ) : (
    <Loading />
  );
}

export default AddShows;
