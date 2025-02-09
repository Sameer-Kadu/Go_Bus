import { Calendar, MapPin, User, Mail, ChevronDown } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import PaymentSuccessModal from "./PaymentSuccess";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { createBooking } from "../services/user";
import { toast } from "react-toastify";
const TicketSummary = () => {
const email = sessionStorage.getItem("email");
  const location = useLocation();
  const { selectedSeats, bus, passengerDetails } = location.state || { selectedSeats: [], bus: {}, passengerDetails: [] };
  
  const totalFare = selectedSeats.length * (bus.busFare || 0);
  const discount = totalFare * 0.08;
  const payableAmount = totalFare - discount;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handlePayment = async () => {
    const transactionId = "TXN" + Math.floor(1000000000 + Math.random() * 9000000000); // Random Transaction ID
    const dateOfBooking = moment().format("YYYY-MM-DD");
    const timeOfBooking = moment().format("HH:mm:ss");
    const email = sessionStorage.getItem("email") || "unknown@example.com";
  
    // Creating seat allocation array
    const seatAllocation = selectedSeats.map((seat) => ({
      isBooked: true,
      seatNo: seat,
      travellerGender: passengerDetails.find(p => p.seatNumber === seat)?.gender || "Not Specified",
    }));
  
    // Creating passenger array
    const passengerData = passengerDetails.map((passenger) => ({
      passengerName: passenger.name,
      passengerGender: passenger.gender,
      seatNo: passenger.seatNumber,
    }));
  const scheduleId = sessionStorage.getItem("scheduleId");
    // Final Booking Object
    const bookingObject = {
      dateOfBooking,
      timeOfBooking,
      paymentStatus: true,
      bookingStatus: "Booked",
      scheduleId,
      totalAmount: payableAmount.toFixed(2),
      transactionId,
      email,
      seatAllocation,
      passengers: passengerData,
    };
  
    console.log("🚀 Booking Object:", bookingObject);
    const result = await createBooking(bookingObject);
    if(result["status"] == 200)
    {
      toast.success("booking successful")
      // alert("booking successful");
    }
    else{
      toast.error("booking failed")
      // alert("booking failed");
    }
    setShowSuccessModal(true); // Show payment success modal
  };

  const formatDeparture = (date, time) => {  
    // Combine date and time to create a single moment object  
    const combined = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');  
    return combined.format('DD/MMM/YYYY HH:mm'); // Format to your desired output  
};   
  return (
    <div className="max-w-2xl mt-10 mx-auto p-4 bg-white rounded-lg shadow">
      {/* Travel Agency Header */}
      <div className="mb-6">
        <h1 className="text-yellow-800 text-xl font-semibold">
          {bus.agencyName}
        </h1>
        <p className="text-gray-600 text-sm">{bus.ac ? "A/C " : "Non-AC "} {bus.sleeper ? "Sleeper " : "Seater"}</p>
      </div>
      {/* Journey Details */}
      <div className="space-y-6 mb-6">
        {/* Departure & Seats */}
        <div className="flex items-start justify-between border-b pb-4">
          <div className="flex gap-3">
            <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-gray-600 text-sm">Departure</p>
              <p className="font-medium">{formatDeparture(bus.departureDate, bus.departureTime)}</p>
            </div>
          </div>
          <div>
          <p className="text-gray-600 text-sm">passengers</p>
              
            <p  className="font-medium text-right">{selectedSeats.length} </p>
           
          </div>
        </div>

        {/* Boarding & Dropping Points */}
        <div className="flex items-start gap-3 border-b pb-4">
          <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Boarding Point</p>
                <p className="font-medium">{bus.sourceCity}</p>
                <p className="text-sm text-gray-600">
                  {bus.boardingPoint}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Dropping Point</p>
                <p className="font-medium">{bus.destinationCity}</p>
                <p className="text-sm text-gray-600">{bus.destinationPoint}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        {passengerDetails.map((passenger, index) => (<div key={index} className="flex items-center gap-3 border-b pb-4">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="font-medium">{passenger.name}</p>
            <p className="text-sm text-gray-600">({passenger.age}, {passenger.gender})</p>
          </div>
        </div>))}
        

        {/* Contact Information */}
        <div className="flex items-center gap-3 border-b pb-4">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-gray-700">Your ticket will be sent to</p>
            <p className="font-medium">{email}</p>
          </div>
        </div>
      </div>
      {/* Savings Banner */}
      <div className="bg-emerald-500 text-white p-3 rounded-md mb-4">
        You are saving ₹ {discount} on this ticket.
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
            <span>INR {totalFare}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total Payable</span>
            <span>INR {payableAmount}</span>
          </div>
          <div className="flex justify-between bg-green-50 p-2 rounded">
            <span>Total Discount</span>
            <span>INR {discount}</span>
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
