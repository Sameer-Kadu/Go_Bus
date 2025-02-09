import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Details from "./Details";
import Filter from "./Filter";
import SortBy from "./SortBy";
import BusDetails from "./BusDetails";
import { useEffect, useState } from "react";
import {  getTravelerBuses } from "../services/operator";
import { toast } from "react-toastify";

const Buses = () => {
  // Retrieve query parameters from the URL
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  // For example, you might have stored a user name in sessionStorage
  const name = sessionStorage.getItem("name");
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    const onLoadItems = async () => {
      try {
        const result = await getTravelerBuses({ source, destination, date }); // Pass as an object
    
        console.log("result", result);
    
        if (Array.isArray(result) && result.length > 0) {
          sessionStorage.setItem("scheduleId", result[0].scheduleId)
          console.log("here session schedule id"+sessionStorage.getItem("scheduleId"))
          setBuses(result);
        } else {
          setBuses([]);
          toast.error(result && result.error ? result.error : "No buses found")
          
        }
      } catch (error) {
        toast.error("Error fetching buses:", error)
        console.error("Error fetching buses:", error);
        setBuses([]);
      }
    };

    // the function (1st param) will be called as soon as
    // the component gets mounted (loaded)
    console.log('component is mounted...')
    onLoadItems()

    return () => {
      // this function will get called when the component
      // gets unmounted (unloaded)
      console.log('component is unmounted...')
    }
  },[source, destination, date])



  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar classes="!text-black dark:after:bg-black" name={name} />
  
      {/* Main Content - Make it grow to push Footer down */}
      <div className="px-6 mb-5 flex-grow">
        <div className="mt-20 pt-[2.5px]">
          <Details source={source} destination={destination} date={date} />
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-4 text-sm mt-4">
          <div>
            <Filter />
          </div>
          <div>
            <SortBy />
            <div className="overflow-auto h-[65vh] mt-4">
              {buses.map((bus) => (<BusDetails key={bus.id} bus={bus}/>))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer - Always at bottom */}
      <Footer />
    </div>
  );
  
};

export default Buses;
