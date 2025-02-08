import { Star, MapPin, Clock } from "lucide-react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "../components/Button";
import BusSeat from "../Bus/BusSeat";
import { useState } from "react";
import PropTypes from 'prop-types';

const BusDetails = ({ bus }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className="border rounded-lg shadow-md">
        <div className="flex w-[100%] pt-9">
          {/* Left Section */}
          <div className="flex flex-col mr-[390px]">
            <h2 className="text-lg font-semibold truncate">{bus.agencyName || "Unknown Bus"}</h2>
            <p className="text-sm text-gray-500 truncate">
              {bus.ac ? "A/C " : "Non-AC "} {bus.sleeper ? "Sleeper " : "Seater"}
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <Clock className="w-4 h-4" />
              <span>{bus.departureTime} - {bus.arrivalTime}</span>
            </div>
          </div>

          {/* Middle Section */}
          <div className="justify-between flex w-[100%]">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold">{bus.departureTime}</div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{bus.boardingPoint || "Unknown Boarding Point"}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 ml-9">12h 00m</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xl font-bold">{bus.arrivalTime}</div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{bus.destinationPoint || "Unknown Destination"}</span>
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">4.4</span>
              </div>
              <p className="text-sm text-gray-500 truncate">78 reviews</p>
            </div>

            {/* Fare and Available Seats */}
            <p className="text-lg font-semibold mt-2">INR {bus.busFare || "N/A"}</p>
            <p className="text-sm text-gray-500 truncate">
              {bus.seats ? bus.seats.filter(seat => !seat.booked).length : 0} Seats available
            </p>
          </div>
        </div>

        {/* View Seats Button */}
        <div className="flex justify-end gap-4 mt-2 w-[100%] mb-2">
          <Button
            id="watch-trailer"
            title="View Seats"
            leftIcon={<TiLocationArrow />}
            change={toggleDiv}
            containerClass="!bg-yellow-300 flex-center gap-1"
          />
        </div>
      </div>

      {isVisible && <BusSeat seats={bus.seats}  bus = {bus}/>}
    </div>
  );
};
BusDetails.propTypes = {
  bus: PropTypes.shape({
    agencyName: PropTypes.string,
    ac: PropTypes.bool,
    sleeper: PropTypes.bool,
    departureTime: PropTypes.string,
    arrivalTime: PropTypes.string,
    boardingPoint: PropTypes.string,
    destinationPoint: PropTypes.string,
    busFare: PropTypes.number,
    seats: PropTypes.arrayOf(PropTypes.shape({
      booked: PropTypes.bool
    }))
  }).isRequired
};

export default BusDetails;

