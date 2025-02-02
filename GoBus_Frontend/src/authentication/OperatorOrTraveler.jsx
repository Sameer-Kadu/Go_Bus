import Button from "./../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import PropTypes from 'prop-types';

const OperationOrTraveler = ({onClose})=>{
  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm rounded-3xl z-50">
      <div className="mt-10 flex flex-col gap-5 text-white justify-center items-center h-80">
        <div>
          <h1 className="text-black heading">Register as</h1>
          <div className="justify-center items-center ml-3">
          <Button
           id="Operator"
            title="Operator"
            change={()=>onClose("Operator")}
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-yellow-300 flex-center gap-1 "
          />
          
          <Button
            id="Operator"
            title="Traveler"
            change={()=>onClose("Traveler")}
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-yellow-300 flex-center gap-1"
          />
          </div>
        </div>
      </div>
    </div>
)}

OperationOrTraveler.propTypes = {
    onClose: PropTypes.func,
    };

export default OperationOrTraveler;
