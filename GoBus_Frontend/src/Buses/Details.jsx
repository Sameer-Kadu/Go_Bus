import { FaArrowRight } from "react-icons/fa";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Details = () => {
  return (
    <div>
      <div className="text-sm flex inline-flex gap-2 mb-3">
        <b>Bus Ticket </b> <IoIosArrowForward className="mt-1"/> Pune To Wardha Bus
      </div>
      <div>
        <b>Pune to Wardha Bus</b>
      </div>
      <hr className="border-gray-400 mt-2"></hr>
      <div className="flex gap-4 mt-2 mb-2">
        <div className="mt-2 flex gap-4">
          Pune
          <FaArrowRight className="mt-1" />
          Wardha{" "}
          <IoIosArrowBack className="mt-1"/>
          <span>
             27 Jan 
          </span>
          <IoIosArrowForward className="mt-1"/>
        </div>

        <Button
          id="watch-trailer"
          title="Modify"
          leftIcon={<TiLocationArrow/>}
          containerClass="!bg-yellow-200 w-10 flex-center gap-1"
        />
      </div>
      <hr className="border-gray-400"></hr>
    </div>
  );
};
export default Details;
