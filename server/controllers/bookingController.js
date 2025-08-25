import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// check seats availability helper
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats || {};
    return !selectedSeats.some((seat) => occupiedSeats[seat]);
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// ✅ Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.user?._id; // Clerk userId string
    console.log("Fetching bookings for user:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Create new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.user?._id;  // ✅ FIXED HERE
    const { showId, selectedSeats } = req.body;
    console.log(userId);
    console.log(showId);
    console.log(selectedSeats);
    
    
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({ success: false, message: "Seats already taken" });
    }

    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.json({ success: false, message: "Show not found" });
    }

    const booking = await Booking.create({
      user: userId,   // ✅ Will now save properly
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });
    console.log(booking);
    
    // mark seats as occupied
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified("occupiedSeats");
    await showData.save();

    return res.json({ success: true, booking, message: "Booked Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get occupied seats
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData) return res.json({ success: false, message: "Show not found" });

    const occupiedSeats = Object.keys(showData.occupiedSeats || {});
    return res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
