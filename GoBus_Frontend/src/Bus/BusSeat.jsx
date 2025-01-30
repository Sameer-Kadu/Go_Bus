import { useState } from "react";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
const BusSeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seat layout with left (2-person) and right (1-person) sides
  const seatLayout = {
    lower: [
      ["1AL", "1BL", "1CL", "1DL", "1EL", "1FL"], // null = spacer between sides
      ["2AL", "2BL", "2CL", "2DL", "2EL", "2FL"],
      [null, null, null, null, null, null],
      ["3AL", "3BL", "3Cl", "3Dl", "3El", "3FR"],
    ],
    upper: [
      ["4AL", "4BL", "4CL", "4DL", "4EL", "4FL"], // null = spacer between sides
      ["5AL", "5BL", "5CL", "5DL", "5EL", "5FL"],
      [null, null, null, null, null, null],
      ["6AL", "6BL", "6CR", "6DR", "6ER", "6FR"],
    ],
  };

  const handleSeatClick = (seat) => {
    if (!seat) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
    } else {
      alert(`Proceeding to payment for seats: ${selectedSeats.join(", ")}`);
    }
  };

  return (
    <div className="flex justify-between items-center pl-[200px] pr-[200px] p-2">
      

      {/* Lower Deck */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upper Deck</h2>
        <div className="flex flex-col gap-6">
          {seatLayout.lower.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 items-center">
              {/* Left Side (2-person seats) */}
              <div className="flex gap-4">
                {row.slice(0, 3).map(
                  (seat) =>
                    seat && (
                      <div
                        key={seat}
                        className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        <MdAirlineSeatReclineExtra className="text-xl" />
                      </div>
                    )
                )}
              </div>

              {/* Right Side (1-person seat) */}
              <div className="flex gap-4">
                {row.slice(3).map(
                  (seat) =>
                    seat && (
                      <div
                        key={seat}
                        className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        <MdAirlineSeatReclineExtra className="text-xl" />
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upper Deck */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lower Deck</h2>
        <div className="flex flex-col gap-6">
          {seatLayout.upper.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 items-center">
              {/* Left Side (2-person seats) */}
              <div className="flex gap-4">
                {row.slice(0, 3).map(
                  (seat) =>
                    seat && (
                      <div
                        key={seat}
                        className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        <MdAirlineSeatReclineExtra className="text-xl" />
                      </div>
                    )
                )}
              </div>

              {/* Right Side (1-person seat) */}
              <div className="flex gap-4">
                {row.slice(3).map(
                  (seat) =>
                    seat && (
                      <div
                        key={seat}
                        className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedSeats.includes(seat)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        <MdAirlineSeatReclineExtra className="text-xl" />
                      </div>
                    )
                )}
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats and Payment Button */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Selected Seats: {selectedSeats.join(", ") || "None"}
        </h3>
        <Button
          id="watch-trailer"
          title="Proceed to Payment"
          leftIcon={<TiLocationArrow />}
            change={handleProceedToPayment}
          containerClass="!bg-yellow-300 flex-center gap-1"
        />
      </div>
    </div>
  );
};

 export default BusSeatBooking;
