import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dummyShowsData, dummyDateTimeData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BLurCircle";
import { toast } from "react-hot-toast";

function SeatLayout() {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
  const seatsPerRow = 9;

  useEffect(() => {
    const movie = dummyShowsData.find((item) => item._id === id);
    const timings = dummyDateTimeData[date];

    if (!movie) {
      toast.error("Movie not found");
      return;
    }

    if (!timings) {
      toast.error("Invalid date or timings not available");
      return;
    }

    setShow({ movie, timings });
  }, [id, date]);

  const handleSeatSelect = (seatNumber) => {
    if (!selectedTime) {
      toast("Please select a time first", { icon: "⏰" });
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length >= 4) {
        toast.error("You can only select up to 4 seats");
        return;
      }
      setSelectedSeats((prev) => [...prev, seatNumber]);
    }
  };

  const handleCheckout = () => {
    if (!selectedTime || selectedSeats.length === 0) {
      toast.error("Please select time and seats first");
      return;
    }

    navigate("/my-bookings");
  };

  if (!show) return <Loading />;

  return (
    <div className="min-h-screen text-white px-4 py-8 pt-24 md:px-16 lg:px-24 relative">
      <BlurCircle top="-150px" left="-100px" />
      <BlurCircle top="0" right="0" />

      <h2 className="text-2xl font-semibold mb-4">🎬 Select Show Time</h2>
      <div className="flex flex-wrap gap-4 mb-10">
        {show.timings.map((item) => (
          <div
            key={item.time}
            onClick={() => setSelectedTime(item)}
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded border transition-all duration-200 ${
              selectedTime?.time === item.time
                ? "bg-primary text-white border-primary-dull"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <ClockIcon className="w-4 h-4" />
            <p>{isoTimeFormat(item.time)}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-2">🎟️ Select Your Seats</h2>
      <div className="text-center mb-8">
        <img
          src={assets.screenImage}
          alt="screen"
          className="mx-auto max-w-sm"
        />
        <p className="text-gray-300 mt-1 text-sm tracking-widest">
          SCREEN THIS WAY
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {rows.map((rowPair, idx) => (
          <div key={idx} className="flex justify-center gap-8">
            {rowPair.map((row) => (
              <div key={row} className="flex gap-2">
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatNumber = `${row}${i + 1}`;
                  const isSelected = selectedSeats.includes(seatNumber);
                  return (
                    <button
                      key={seatNumber}
                      onClick={() => handleSeatSelect(seatNumber)}
                      className={`w-10 h-10 rounded-md border text-sm transition ${
                        isSelected
                          ? "bg-primary text-white border-primary-dull"
                          : "bg-white text-black hover:bg-gray-200"
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCheckout}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dull text-white px-6 py-3 rounded-lg transition"
        >
          Proceed To Checkout <ArrowRightIcon strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default SeatLayout;
