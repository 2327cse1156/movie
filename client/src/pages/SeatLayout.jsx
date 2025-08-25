// SeatLayout.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

function SeatLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const[selectedTime,setSelectedTime]=useState(null)
  const [movie, setMovie] = useState(null);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats,setOccupiedSeats] = useState([])
  // Fetch show
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await axios.get(`/api/show/${id}`);
        if (data.success) {
          setMovie(data.movie);

          if (data.dateTime) {
            const firstDate = Object.keys(data.dateTime)[0];
            const firstShow = data.dateTime[firstDate][0];
            if (firstShow) {
              const showId = firstShow.showId;
              const { data: seatData } = await axios.get(
                `/api/booking/occupied/${showId}`
              );
              setShow({
                _id: showId,
                showDateTime: firstShow.time,
                showPrice: firstShow.showPrice,
                occupiedSeats: seatData.success ? seatData.occupiedSeats : [],
              });
            }
          }
        } else {
          toast.error("Show not found");
        }
      } catch (err) {
        console.error("❌ Error:", err);
        toast.error("Failed to load show details");
      }
    })();
  }, [id, axios]);

  // Seat selection
  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((s) => s.filter((x) => x !== seat));
    } else {
      if (selectedSeats.length >= 4) return toast.error("Max 4 seats allowed");
      setSelectedSeats((s) => [...s, seat]);
    }
  };
  const getOccupiedSeats = async()=>{
    try {
      const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
      if(data.success)
      {
        setSelectedSeats(data.occupiedSeats)
      }
      else
      {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(selectedTime)
    {
      getOccupiedSeats()
    }
  },[selectedTime])

  const handleCheckout = () => {
    if (!selectedSeats.length) return toast.error("Select at least 1 seat");
    navigate("/my-bookings", {
      state: { showId: show._id, seats: selectedSeats },
    });
  };

  if (!show) return <Loading />;

  const takenSeats = show.occupiedSeats || [];

  const seatGroups = [
    {
      label: "Front",
      rows: ["A", "B"],
      seatsPerRow: 5, 
      color: "bg-blue-900/20 border-blue-500/50",
      price: show.showPrice,
    },
    {
      label: "Middle",
      rows: ["C", "D", "E"],
      seatsPerRow: 6,
      color: "bg-green-900/20 border-green-500/50",
      price: show.showPrice + 50,
    },
    {
      label: "Back",
      rows: ["F", "G"],
      seatsPerRow: 7,
      color: "bg-purple-900/20 border-purple-500/50",
      price: show.showPrice + 100,
    },
  ];

  return (
    <div className="min-h-screen text-white px-4 py-8 pt-24 md:px-16 lg:px-24 relative">
      <BlurCircle top="-150px" left="-100px" />
      <BlurCircle top="0" right="0" />

      {/* Show Info */}
      <h2 className="text-2xl font-semibold mb-4">🎬 {movie?.title}</h2>
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="flex items-center gap-2 px-4 py-2 rounded border bg-white text-black">
          <ClockIcon className="w-4 h-4" />
          <p>
            {show.showDateTime
              ? new Date(show.showDateTime).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Screen */}
      <h2 className="text-2xl font-semibold mb-2">🎟️ Select Your Seats</h2>
      <div className="text-center mb-6">
        <img
          src={assets.screenImage}
          alt="screen"
          className="mx-auto max-w-xs"
        />
        <p className="text-gray-300 mt-1 text-sm tracking-widest">
          SCREEN THIS WAY
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-10 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-white border rounded" /> Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-primary rounded" /> Selected
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-gray-500 rounded" /> Booked
        </div>
      </div>

      {/* Seats */}
      <div className="space-y-10 mb-12">
        {seatGroups.map((group) => (
          <div
            key={group.label}
            className={`${group.color} rounded-2xl p-6 shadow-lg border`}
          >
            {/* Group Label */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-200 text-lg font-semibold tracking-wide uppercase">
                {group.label} Section
              </h3>
              <span className="bg-black/40 px-3 py-1 rounded text-sm font-medium">
                💰 ₹{group.price}
              </span>
            </div>

            {/* Rows inside this group */}
            <div className="space-y-5">
              {group.rows.map((row) => (
                <div
                  key={row}
                  className="flex justify-center items-center gap-2"
                >
                  {/* Row label */}
                  <span className="w-6 text-gray-400 text-sm">{row}</span>

                  {/* Seats */}
                  {Array.from({ length: group.seatsPerRow }, (_, i) => {
                    const seat = `${row}${i + 1}`;
                    const taken = takenSeats.includes(seat);
                    const selected = selectedSeats.includes(seat);


                    return (
                      <div key={seat}>
                        {/* Add aisle in middle */}
                        {i === Math.floor(group.seatsPerRow / 2) && (
                          <span className="w-6" />
                        )}

                        <button
                          disabled={taken}
                          onClick={() => toggleSeat(seat)}
                          className={`relative w-9 h-9 rounded-md border font-medium text-xs transition-all duration-200 ${
                            taken
                              ? "bg-gray-500 text-white cursor-not-allowed"
                              : selected
                              ? "bg-primary text-white border-primary scale-105 shadow-lg"
                              : "bg-white text-black hover:bg-primary hover:text-white hover:scale-105"
                          }${occupiedSeats.includes(seat)&&"opacity-50"}`}
                        >
                          {seat}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout */}
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
