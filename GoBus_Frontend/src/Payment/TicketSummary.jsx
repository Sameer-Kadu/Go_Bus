import { Calendar, MapPin, User, Mail, ChevronDown } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import PaymentSuccessModal from "./PaymentSuccess";
const TicketSummary = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handlePayment = () => {
    setShowSuccessModal(true);
  };
  return (
    <div className="max-w-2xl mt-10 mx-auto p-4 bg-white rounded-lg shadow">
      {/* Travel Agency Header */}
      <div className="mb-6">
        <h1 className="text-yellow-800 text-xl font-semibold">
          Sindh Radhe Travels
        </h1>
        <p className="text-gray-600 text-sm">Bharat Benz A/C Sleeper (2+1)</p>
      </div>
      {/* Journey Details */}
      <div className="space-y-6 mb-6">
        {/* Departure & Seats */}
        <div className="flex items-start justify-between border-b pb-4">
          <div className="flex gap-3">
            <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-gray-600 text-sm">Departure</p>
              <p className="font-medium">30/Jan/2025 19:30</p>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Seats</p>
            <p className="font-medium text-right">32</p>
          </div>
        </div>

        {/* Boarding & Dropping Points */}
        <div className="flex items-start gap-3 border-b pb-4">
          <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Boarding Point</p>
                <p className="font-medium">Pune</p>
                <p className="text-sm text-gray-600">
                  SANGAMWADI -Sindh Radhe Travels,
                </p>
                <p className="text-sm text-gray-600">khadda parking</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Dropping Point</p>
                <p className="font-medium">Wardha</p>
                <p className="text-sm text-gray-600">Bus stand</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="flex items-center gap-3 border-b pb-4">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="font-medium">Samir Kadu</p>
            <p className="text-sm text-gray-600">(24,M)</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex items-center gap-3 border-b pb-4">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-gray-700">Your ticket will be sent to</p>
            <p className="font-medium">samirkadu8@gmail.com</p>
            <p className="font-medium">917620923669</p>
          </div>
        </div>
      </div>
      {/* Savings Banner */}
      <div className="bg-emerald-500 text-white p-3 rounded-md mb-4">
        You are saving ₹ 68 on this ticket.
      </div>
      {/* Fare Breakdown */}
      <div>
        <button className="flex items-center gap-2 text-yellow-600 font-medium mb-4">
          FARE BREAKUP
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Onward Fare</span>
            <span>INR 874.13</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total Payable</span>
            <span>INR 874.13</span>
          </div>
          <div className="flex justify-between bg-green-50 p-2 rounded">
            <span>Total Discount</span>
            <span>INR 68</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
      <Button
        id="watch-trailer"
        title="Make Payment"
        leftIcon={<TiLocationArrow />}
        change={handlePayment}
        containerClass="!bg-yellow-300 flex-center gap-1"
      />
      </div>
      {/* Payment Success Modal */}
      <PaymentSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default TicketSummary;
