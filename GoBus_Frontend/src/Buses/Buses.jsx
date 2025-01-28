import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Details from "./Details";
import Filter from "./Filter";
import SortBy from "./SortBy";
import BusDetails from "./BusDetails";

const Buses = () => {
  return (
    <div className="">
      <Navbar classes="!text-black dark:after:bg-black" />
      <div className="px-6 mb-5">
        <div className="mt-20 pt-[2.5px]">
          <Details />
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-4 text-sm mt-4">
          <div>
            <Filter />
          </div>
          <div>
            <SortBy />
            <div className="overflow-auto h-[65vh] mt-4">
              <BusDetails />
              <BusDetails />
              <BusDetails />
              <BusDetails />
              <BusDetails />
              <BusDetails />
              <BusDetails />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buses;
