import React, { useState, useRef } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const scrollRef = useRef(null);

  const onBookHandler = () => {
    if (!selectedDate) {
      toast("Please select a date");
      return;
    }
    navigate(`/movie/${id}/${selectedDate}`);
    scrollTo(0, 0);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Helper function to get "Today" / "Tomorrow" labels
  const getDayLabel = (date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const givenDate = new Date(date);

    if (
      givenDate.getDate() === today.getDate() &&
      givenDate.getMonth() === today.getMonth()
    ) {
      return "Today";
    }
    if (
      givenDate.getDate() === tomorrow.getDate() &&
      givenDate.getMonth() === tomorrow.getMonth()
    ) {
      return "Tomorrow";
    }
    return null;
  };

  return (
    <div
      id="dateSelect"
      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-950 py-12 px-6 md:px-16 lg:px-32 text-white text-center rounded-xl shadow-lg overflow-hidden"
    >
      {/* Blur Circles */}
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle top="100px" right="0px" />

      {/* Heading */}
      <p className="text-2xl font-bold mb-6">📅 Choose Date</p>

      {/* Date Buttons with Scroll */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={scrollLeft}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        >
          <ChevronLeftIcon width={28} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl"
        >
          {Object.keys(dateTime).map((date) => {
            const givenDate = new Date(date);
            const day = givenDate.toLocaleString("en-US", { weekday: "short" });
            const dayNum = givenDate.getDate();
            const month = givenDate.toLocaleString("en-US", { month: "short" });
            const label = getDayLabel(date);

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-lg border transition-all duration-300 ${
                  selectedDate === date
                    ? "bg-red-500 text-white border-red-500 scale-105"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:scale-105"
                }`}
              >
                {label && (
                  <span className="text-[10px] text-yellow-400 font-semibold mb-1">
                    {label}
                  </span>
                )}
                <span className="text-xs text-gray-400">{day}</span>
                <span className="text-lg font-bold">{dayNum}</span>
                <span className="text-sm">{month}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        >
          <ChevronRightIcon width={28} />
        </button>
      </div>

      {/* Book Now Button */}
      <button
        onClick={onBookHandler}
        className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 transition rounded-lg font-semibold text-lg shadow-lg"
      >
        🎟️ Book Now
      </button>
    </div>
  );
};

export default DateSelect;
