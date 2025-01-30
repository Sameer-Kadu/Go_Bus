import { UserCircle } from "lucide-react";
import PassengerForm from "./PassengerForm";
import { MapPin } from "lucide-react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
const PassengerInformation = () => {
  const passengers = [
    { number: 1, seat: 31 },
    { number: 2, seat: 32 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-Yellow-100 p-2 rounded-full">
          <UserCircle className="h-5 w-5 text-yellow-600" />
        </div>
        <h1 className="text-xl font-semibold">Passenger Information</h1>
      </div>

      {passengers.map((passenger) => (
        <PassengerForm
          key={passenger.number}
          passengerNumber={passenger.number}
          seatNumber={passenger.seat}
        />
      ))}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-medium text-gray-700">Travel Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Boarding Point*
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
              <option value="">Select boarding point</option>
              <option value="point1">Mumbai Central</option>
              <option value="point2">Dadar</option>
              <option value="point3">Thane</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dropping Point*
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
              <option value="">Select dropping point</option>
              <option value="point1">Pune Station</option>
              <option value="point2">Shivaji Nagar</option>
              <option value="point3">Katraj</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/payment">
        <Button
          id="watch-trailer"
          title="Make Payment"
          leftIcon={<TiLocationArrow />}
          containerClass="!bg-yellow-300 flex-center gap-1"
        />
        </Link>
      </div>
    </div>
  );
};

export default PassengerInformation;
