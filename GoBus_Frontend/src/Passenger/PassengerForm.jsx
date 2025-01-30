import { useState } from 'react';
import PropTypes from 'prop-types';
import { UserCircle } from 'lucide-react';
const PassengerForm = ({ passengerNumber, seatNumber }) => {
    const [stateValue, setStateValue] = useState('Maharashtra');
  
    return (
      <div className="mb-6 p-6 border rounded-lg shadow-sm bg-white">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-yellow-100 p-2 rounded-full">
            <UserCircle className="h-5 w-5 text-yellow-600" />
          </div>
          <h2 className="text-gray-500">
            Passenger {passengerNumber} | <span className="text-gray-700">Seat {seatNumber}</span>
          </h2>
        </div>
  
        <div className="space-y-4">
          {/* Travel Points Section */}
          
  
          {/* Name Input */}
          <div>
            <label htmlFor={`name-${passengerNumber}`} className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id={`name-${passengerNumber}`}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter passenger name"
            />
          </div>
  
          {/* Gender and Age Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`gender-${passengerNumber}`}
                    value="male"
                    className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`gender-${passengerNumber}`}
                    value="female"
                    className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
              </div>
            </div>
  
            <div>
              <label htmlFor={`age-${passengerNumber}`} className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                id={`age-${passengerNumber}`}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Age"
              />
            </div>
          </div>
  
          {/* State of Residence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State of Residence*
            </label>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{stateValue}</span>
              <button 
                onClick={() => {/* Handle state change */ setStateValue('Goa')}}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
    export default PassengerForm;
  PassengerForm.propTypes = {
    passengerNumber: PropTypes.number.isRequired,
    seatNumber: PropTypes.number.isRequired,
  };
  
  