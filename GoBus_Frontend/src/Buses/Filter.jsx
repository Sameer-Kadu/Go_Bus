import { WiDayHaze, WiDaySunny, WiDaySunnyOvercast, WiDayFog } from "react-icons/wi";
import { FaBed } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
const Filter = () => {
  return (
    <div>
      <b>FILTERS</b>
      <hr className="border-gray-400 mt-4"></hr>
      <p className="mt-2 mb-2">Live Tracking (15)</p>
      <hr className="border-gray-400 mt-2 mb-2"></hr>
      <b>DEPARTURE TIME</b>
      <div className="pt-1 mb-2">
        <div className="flex gap-1"><input type="checkbox"/><WiDayHaze className="w-7 h-7"/><p className="mt-1">Before 6 am</p></div>
        <div className="flex gap-1"><input type="checkbox"/><WiDaySunny className="w-7 h-7"/><p className="mt-1">6 am to 12 pm</p></div>
        <div className="flex gap-1"><input type="checkbox"/><WiDaySunnyOvercast className="w-7 h-7"/><p className="mt-1">12 pm to 6 pm</p></div>
        <div className="flex gap-1"><input type="checkbox"/><WiDayFog className="w-7 h-7"/><p className="mt-1">After 6am</p></div>
      </div>
      <hr className="border-gray-400 mt-2 mb-2"></hr>
      <b>ARRIVAL TIME</b>
      <div className="pt-1 mb-2">
        <div className="flex gap-1"><input type="checkbox"/><WiDayHaze className="w-7 h-7"/><p className="mt-1">Before 6 am</p></div>
        <div className="flex gap-1"><input type="checkbox"/><WiDaySunny className="w-7 h-7"/><p className="mt-1">6 am to 12 pm</p></div>
        <div className="flex gap-1"><input type="checkbox"/><WiDaySunnyOvercast className="w-7 h-7"/><p className="mt-1">12 pm to 6 pm</p></div>
        <div className="flex gap-1"><input type="checkbox"/><WiDayFog className="w-7 h-7"/><p className="mt-1">After 6am</p></div>
      </div>
      <hr className="border-gray-400 mt-2 mb-2"></hr>
      <b >BUS TYPES</b>
      <div className="pt-1 ">
        <div className="flex gap-1"><input type="checkbox"/><FaBed className="w-5 h-7"/><p className="mt-1">SLEEPER</p></div>
        <div className="flex gap-1"><input type="checkbox"/><TbAirConditioning className="w-5 h-7"/><p className="mt-1">AC</p></div>
       </div>
       <hr className="border-gray-400 mt-2 mb-2"></hr>
       <b >BOARDING POINT</b>
        <div className="flex pt-1">
            <span className="inline-flex  ">
            <img
              src="/img/Source_stop.svg"
              alt=""
              className="w-7 h-7 mt-1 "
            />
            </span>
            <input type="text" className="mt-1 rounded-none rounded-e-lg border border-gray-300 h-7"/>
        </div>
        <b >DROPPING POINT</b>
        <div className="flex pt-1 mb-2">
            <span className="inline-flex  ">
            <img
              src="/img/Destination_stop.svg"
              alt=""
              className="w-7 h-7 mt-1 "
            />
            </span>
            <input type="text" className="mt-1 rounded-none rounded-e-lg border border-gray-300 h-7"/>
        </div>
        <b >OPERATOR</b>
        <div className="flex pt-1">
            <span className="inline-flex  ">
            <MdOutlineManageAccounts className="h-7 w-7 mt-1"/>
            </span>
            <input type="text" className="mt-1 rounded-none rounded-e-lg border border-gray-300 h-7"/>
        </div>
       
    </div>
  );
};
export default Filter;
 