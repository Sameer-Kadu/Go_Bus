import { useLocation, useNavigate } from "react-router-dom";
import { UserCircle, MapPin } from "lucide-react";
import PassengerForm from "./PassengerForm";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useState } from "react";
import { toast } from "react-toastify";

const PassengerInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, bus } = location.state || { selectedSeats: [], bus: {} };

  const [passengerDetails, setPassengerDetails] = useState(
    selectedSeats.map(seat => ({
      seatNumber: seat,
      name: "",
      gender: "",
      age: ""
    }))
  );

  // Update passenger details when input changes
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][field] = value;
    setPassengerDetails(updatedPassengers);
  };

  // Handle Payment Process
  const handlePayment = () => {
    const isFormValid = passengerDetails.every(
      (passenger) => passenger.name && passenger.gender && passenger.age
    );

    if (!isFormValid) {
      toast.error("Please fill in all passenger details before proceeding!");
      return;
    }

    navigate("/payment", { state: { selectedSeats, bus, passengerDetails } });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-yellow-100 p-2 rounded-full">
          <UserCircle className="h-5 w-5 text-yellow-600" />
        </div>
        <h1 className="text-xl font-semibold">Passenger Information</h1>
      </div>

      {passengerDetails.map((passenger, index) => (
        <PassengerForm
          key={passenger.seatNumber}
          passengerNumber={index + 1}
          seatNumber={passenger.seatNumber}
          onChange={(field, value) => handlePassengerChange(index, field, value)}
        />
      ))}

       {/* Travel Details */}
       <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-medium text-gray-700">Travel Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dynamic Boarding Point */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Boarding Point*
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              {bus.boardingPoint ? (
                <option value={bus.boardingPoint}>{bus.boardingPoint}</option>
              ) : (
                <option value="">No boarding point available</option>
              )}
            </select>
          </div>

          {/* Dynamic Dropping Point */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dropping Point*
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              {bus.destinationPoint ? (
                <option value={bus.destinationPoint}>{bus.destinationPoint}</option>
              ) : (
                <option value="">No dropping point available</option>
              )}
            </select>
          </div>
        </div>
      </div>
      {/* Proceed to Payment */}
      <div className="flex justify-center">
        <Button
          id="make-payment"
          title="Make Payment"
          leftIcon={<TiLocationArrow />}
          change={handlePayment}
          containerClass="!bg-yellow-300 flex-center gap-1"
        />
      </div>
    </div>
  );
};

export default PassengerInformation;
