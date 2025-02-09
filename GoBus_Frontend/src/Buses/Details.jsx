import { FaArrowRight } from "react-icons/fa";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Details = ({ source, destination, date }) => {
  // Format the date if it exists; assume date is in "YYYY-MM-DD" format
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      })
    : "";

  return (
    <div>
      <div className="text-sm inline-flex gap-2 mb-3">
        <b>Bus Ticket </b>
        <IoIosArrowForward className="mt-1" /> {source} To {destination} Bus
      </div>
      <div>
        <b>
          {source} To {destination} Bus
        </b>
      </div>
      <hr className="border-gray-400 mt-2" />
      <div className="flex gap-4 mt-2 mb-2">
        <div className="mt-2 flex gap-4">
          {source}
          <FaArrowRight className="mt-1" />
          {destination}
          <IoIosArrowBack className="mt-1" />
          <span>{formattedDate}</span>
          <IoIosArrowForward className="mt-1" />
        </div>
<Link to={"/"}><Button
          id="watch-trailer"
          title="Modify"
          leftIcon={<TiLocationArrow />}
          containerClass="!bg-yellow-200 w-10 flex-center gap-1"
        /></Link>
        
      </div>
      <hr className="border-gray-400" />
    </div>
  );
};
Details.propTypes = {
  source: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export default Details;

