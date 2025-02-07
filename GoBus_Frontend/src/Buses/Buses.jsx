import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Details from "./Details";
import Filter from "./Filter";
import SortBy from "./SortBy";
import BusDetails from "./BusDetails";
import { useEffect, useState } from "react";
import { getBuses } from "../services/operator";

const Buses = () => {
  // Retrieve query parameters from the URL
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  // For example, you might have stored a user name in sessionStorage
  const name = sessionStorage.getItem("name");
  const [buses, setBuses] = useState([]);
  const onLoadItems = async () => {
    try {
      const result = await getBuses();
      console.log("result", result);
      
      if (result.length > 0) {
        setBuses(result);
      } else {
        // Fallback: set an empty array to avoid undefined
        setBuses([]);
        alert(result && result.error ? result.error : "No data returned");
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      setBuses([]);
    }
  }

    useEffect(() => {
      // the function (1st param) will be called as soon as
      // the component gets mounted (loaded)
      console.log('component is mounted...')
      onLoadItems()
  
      return () => {
        // this function will get called when the component
        // gets unmounted (unloaded)
        console.log('component is unmounted...')
      }
    }, [])



  return (
    <div className="">
      <Navbar classes="!text-black dark:after:bg-black" name={name} />
      <div className="px-6 mb-5">
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
      <Footer />
    </div>
  );
};

export default Buses;
