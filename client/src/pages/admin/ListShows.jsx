import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user } = useAppContext();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

const getAllShows = async () => {
  try {
    console.log("📡 Starting getAllShows...");
    const token = await getToken();
    console.log("🔑 Token received:", token);
    console.log("🌐 Sending request to /api/admin/all-shows...");

    const { data } = await axios.get("/api/admin/all-shows", {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000, // 10s timeout
    });

    console.log("✅ API response received:", data);
    setShows(data.shows || []);
  } catch (error) {
    console.error("❌ Error fetching shows:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    console.log("User in useEffect:", user);
    if (user?.id) {
      console.log("User loaded, calling getAllShows()");
      getAllShows();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Title text1="List" text2="Shows" />
      <div className="overflow-x-auto rounded-xl border border-primary/30">
        <table className="min-w-full text-sm table-auto">
          <thead>
            <tr className="text-left uppercase tracking-wide text-primary text-sm">
              <th className="p-3">Movie Name</th>
              <th className="p-3">Show Time</th>
              <th className="p-3">Total Bookings</th>
              <th className="p-3">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {shows.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No shows available
                </td>
              </tr>
            ) : (
              shows.map((show) => {
                const bookings = Object.keys(show.occupiedSeats || {}).length;
                return (
                  <tr
                    key={show._id || show.id}
                    className="border-t border-primary/20 hover:bg-primary/5 transition duration-200"
                  >
                    <td className="p-3">{show.movie?.title || "N/A"}</td>
                    <td className="p-3">{dateFormat(show.showDateTime)}</td>
                    <td className="p-3">{bookings}</td>
                    <td className="p-3">
                      {currency} {bookings * show.showPrice}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListShows;
