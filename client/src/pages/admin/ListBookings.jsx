import React, { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";

function ListBookings() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  return !isLoading ?(
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <Title text1={"List"} text2={"Bookings"}></Title>
        <div className="overflow-x-auto rounded-xl border border-primary/30">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="uppercase tracking-wide text-primary text-sm text-left">
                <th className="p-3">User Name</th>
                <th className="p-3">Movie Time</th>
                <th className="p-3">Show Time</th>
                <th className="p-3">Seats</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-primary/20 hover:bg-primary/10 transition duration-200"
                >
                  <td className="p-3">{item.user.name}</td>
                  <td className="p-3">{item.show.movie.title}</td>
                  <td className="p-3">{dateFormat(item.show.showDateTime)}</td>
                  <td className="p-3">
                    {Object.keys(item.bookedSeats)
                      .map((seat) => item.bookedSeats[seat])
                      .join(", ")}
                  </td>
                  <td>
                    {currency}
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ):<Loading/>
}

export default ListBookings;
