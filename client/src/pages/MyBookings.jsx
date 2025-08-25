import React, { useEffect, useState } from "react";
import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";

import { useAppContext } from "../context/AppContext";
const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");
  const [showOnlyUnpaid, setShowOnlyUnpaid] = useState(false);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getCountdown = (showTime) => {
    const diff = new Date(showTime) - new Date();
    if (diff <= 0) return "🎬 Already Started";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `⏳ Starts in ${hours}h ${mins}m`;
  };

  const sortedBookings = [...bookings]
    .filter((b) => (showOnlyUnpaid ? !b.isPaid : true))
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.show.showDateTime) - new Date(a.show.showDateTime)
        : new Date(a.show.showDateTime) - new Date(b.show.showDateTime)
    );

  useEffect(() => {
    if (user) getMyBookings();
  }, [user]);

  return !loading ? (
    <div className="pt-24 min-h-screen px-4 sm:px-10 bg-black text-white">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="700px" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎟️ My Bookings</h1>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <select
            className="bg-primary border border-white/10 p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Sort by: Latest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlyUnpaid}
              onChange={() => setShowOnlyUnpaid(!showOnlyUnpaid)}
              className="accent-green-500"
            />
            Show only unpaid
          </label>
        </div>
      </div>

      {sortedBookings.length > 0 ? (
        sortedBookings.map((item, index) => (
          <div
            key={index}
            className="bg-primary border border-white/10 rounded-2xl p-6 shadow-md mb-6 flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={image_base_url + item.show.movie.poster_path}
              className="w-36 h-52 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-300">
                <p>
                  <span className="font-medium text-white">🎬 Title:</span>{" "}
                  {item.show.movie.title}
                </p>
                <p>
                  <span className="font-medium text-white">⏱ Duration:</span>{" "}
                  {timeFormat(item.show.movie.runtime)}
                </p>
                <p>
                  <span className="font-medium text-white">📅 Date:</span>{" "}
                  {dateFormat(item.show.showDateTime)}
                </p>
                <p>
                  <span className="font-medium text-white">🎫 Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>
                <p className="col-span-2">
                  <span className="font-medium text-white">🪑 Seats:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
              </div>

              <p className="mt-3 text-sm text-yellow-400">
                {getCountdown(item.show.showDateTime)}
              </p>

              {!item.isPaid ? (
                <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                  Pay Now
                </button>
              ) : (
                <span className="mt-4 inline-block px-4 py-1 bg-green-800 text-green-300 rounded-full text-xs">
                  Paid
                </span>
              )}
            </div>

            <div className="text-xl font-semibold text-green-400 whitespace-nowrap">
              {currency}
              {item.amount}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 mt-10">
          No bookings found 📭
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
