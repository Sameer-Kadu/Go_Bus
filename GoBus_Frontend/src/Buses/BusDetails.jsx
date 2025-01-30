
import { Star, MapPin, Clock } from "lucide-react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "../components/Button";
import BusSeat from "../Bus/BusSeat";
import { useState } from "react";

const BusDetails=()=>{
  const [isVisible, setIsVisible] = useState(false);  

  const toggleDiv = () => {  
      setIsVisible(!isVisible);  
  }; 
  return (
    <div>
    <div className="border rounded-lg shadow-md">
    <div className="flex   w-[100%] pt-9">
      {/* Left Section */}
      <div className="flex flex-col mr-[390px]">
        <h2 className="text-lg font-semibold truncate">Prasanna - Purple Bus</h2>
        <p className="text-sm text-gray-500 truncate">VE A/C Sleeper (2+1)</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
          <Clock className="w-4 h-4" />
          <span>13h 00m</span>
        </div>
      </div>

      {/* Middle Section */}
      
      <div className="  justify-between flex w-[100%]">
        <div className="flex flex-col items-center">
        <div className="text-xl font-bold">18:00</div>
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="truncate">Sangamwadi</span>
        </div>
        </div>
        <div>
        <p className="text-sm text-gray-500 ml-9">12h 00m</p>
        </div>
        <div className="flex flex-col items-center">
        <div className="text-xl font-bold">07:00</div>
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="truncate">Wardha - Krishi utpanna Bazar</span>
        </div>
        </div>
      
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-green-500" />
          <span className="text-green-600 font-medium">4.4</span>
        </div>
        <p className="text-sm text-gray-500 truncate">78 reviews</p>
        </div>
        <p className="text-lg font-semibold mt-2">INR 1020</p>
        <p className="text-sm text-gray-500 truncate">17 Seats available, 2 Single</p>
      
      
      </div>
     
    </div>
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
    {isVisible &&
    <BusSeat/>}
    </div>
  );
}
export default BusDetails;