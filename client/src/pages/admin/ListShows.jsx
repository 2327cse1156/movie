import { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);
  return !loading ? (
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <Title text1={"List"} text2={"Shows"}></Title>
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
              {shows.map((show, index) => (
                <tr key={index} className="border-t border-primary/20 hover:bg-primary/5 transition duration-200">
                  <td className="p-3">{show.movie.title}</td>
                  <td className="p-3">{dateFormat(show.showDateTime)}</td>
                  <td className="p-3">{Object.keys(show.occupiedSeats).length}</td>
                  <td className="p-3">
                    {currency}{" "}
                    {Object.keys(show.occupiedSeats).length * show.showPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default ListShows;
