import { TiLocationArrow } from "react-icons/ti";
import Button from "../components/Button";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BusSeat = ({ seats = [], bus }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Splitting seats into Upper and Lower Decks
  const upperDeckSeats = seats.slice(0, Math.ceil(seats.length / 2)); // Extra seat goes to Upper Deck
  const lowerDeckSeats = seats.slice(Math.ceil(seats.length / 2));

  // Handle seat selection
  const handleSeatClick = (seat) => {
    if (!seat || seat.booked) return; // Prevent selection of booked seats

    setSelectedSeats((prev) =>
      prev.includes(seat.seatNo)
        ? prev.filter((s) => s !== seat.seatNo)
        : [...prev, seat.seatNo]
    );
  };

  // Handle Proceed to Payment
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      toast.warning("Please select at least one seat.")

      // alert("Please select at least one seat.");
      return;
    }

    if (!sessionStorage.getItem("name")) {
      const currentUrl = window.location.pathname + window.location.search;
      sessionStorage.setItem("redirectAfterLogin", currentUrl);
      navigate("/auth");
    } else {
      navigate("/selectSeat", { state: { selectedSeats, bus } });
    }
  };

  return (
    <div className="inline-flex p-space-y-8 justify-between gap-8 m-4">
      {/* Upper Deck */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Upper Deck</h2>
        <div className="grid grid-cols-6 gap-4">
          {upperDeckSeats.map((seat) => (
            <div
              key={seat.seatNo}
              className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedSeats.includes(seat.seatNo)
                  ? "bg-indigo-600 text-white" // Selected seat
                  : seat.booked
                  ? seat.travellerGender === "FEMALE"
                    ? "bg-pink-500 text-white cursor-not-allowed" // Booked by Female
                    : seat.travellerGender === "MALE"
                    ? "bg-blue-500 text-white cursor-not-allowed" // Booked by Male
                    : "bg-gray-400 cursor-not-allowed" // General Booked Seat
                  : seat.travellerGender === "FEMALE"
                  ? "bg-pink-500 text-white" // Female reserved
                  : seat.travellerGender === "MALE"
                  ? "bg-blue-500 text-white" // Male reserved
                  : "bg-gray-200 hover:bg-gray-300" // Available seat
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              <MdAirlineSeatReclineExtra className="text-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Lower Deck */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Lower Deck</h2>
        <div className="grid grid-cols-6 gap-4">
          {lowerDeckSeats.map((seat) => (
            <div
              key={seat.seatNo}
              className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedSeats.includes(seat.seatNo)
                  ? "bg-indigo-600 text-white" // Selected seat
                  : seat.booked
                  ? seat.travellerGender === "FEMALE"
                    ? "bg-pink-500 text-white cursor-not-allowed" // Booked by Female
                    : seat.travellerGender === "MALE"
                    ? "bg-blue-500 text-white cursor-not-allowed" // Booked by Male
                    : "bg-gray-400 cursor-not-allowed" // General Booked Seat
                  : seat.travellerGender === "FEMALE"
                  ? "bg-pink-500 text-white" // Female reserved
                  : seat.travellerGender === "MALE"
                  ? "bg-blue-500 text-white" // Male reserved
                  : "bg-gray-200 hover:bg-gray-300" // Available seat
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              <MdAirlineSeatReclineExtra className="text-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Seat Legend & Proceed Button */}
      <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-700">SEAT LEGEND</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <MdAirlineSeatReclineExtra className="text-gray-600 text-xl" />
            <span className="text-gray-600 text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAirlineSeatReclineExtra className="text-gray-400 text-xl opacity-50" />
            <span className="text-gray-600 text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAirlineSeatReclineExtra className="text-pink-500 text-xl" />
            <span className="text-gray-600 text-sm">Female Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAirlineSeatReclineExtra className="text-blue-500 text-xl" />
            <span className="text-gray-600 text-sm">Male Reserved</span>
          </div>
        </div>

        {/* Selected Seats & Proceed Button */}
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Selected Seats: {selectedSeats.join(", ") || "None"}
          </h3>
          <div className="flex justify-center">
            <Button
              id="select-seats"
              title="Proceed to Payment"
              leftIcon={<TiLocationArrow />}
              change={handleProceedToPayment}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
BusSeat.propTypes = {
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      seatNo: PropTypes.number.isRequired,
      booked: PropTypes.bool.isRequired,
      travellerGender: PropTypes.string,
    })
  ).isRequired,
  bus: PropTypes.object.isRequired,
};

export default BusSeat;
