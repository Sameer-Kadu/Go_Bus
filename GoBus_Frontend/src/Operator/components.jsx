import React, { useState } from "react";
import {
  Bell,
  Bus,
  Home,
  Plus,
  Settings,
  Star,
  DollarSign,
  Users,
  HelpCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { Result } from "postcss";
import { addBus } from "../services/operator";
import { FaArrowRight } from "react-icons/fa";

const AddBus = ({ onAddBus }) => {
  const [newBus, setNewBus] = useState({
    // Original fields
    status: "Active",

    // Additional fields
    rtoRegNo: "",
    ac: false,
    sleeper: false,
    seatCapacity: "",
    chargingPoint: false,
    complementary_food: false,
    sheetPelow: false,
    toilet: false,
    wifi: false,
    arrivalDate: "",
    arrivalTime: "",
    boardingPoint: "",
    busFare: "",
    departureDate: "",
    departureTime: "",
    destinationCity: "",
    destinationPoint: "",
    sourceCity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Bus Data:", newBus);
    const Result = await addBus(newBus);
    console.log("result bus added"+ Result)
    if(Result["status"] == 201)
    {
      toast.success("bus added successfully")

      // alert("bus added successfully")
    }
    onAddBus(newBus);
    // Reset all fields after submission
    setNewBus({
      status: "Active",
      rtoRegNo: "",
      ac: false,
      sleeper: false,
      seatCapacity: "",
      chargingPoint: false,
      complementary_food: false,
      sheetPelow: false,
      toilet: false,
      wifi: false,
      arrivalDate: "",
      arrivalTime: "",
      boardingPoint: "",
      busFare: "",
      departureDate: "",
      departureTime: "",
      destinationCity: "",
      destinationPoint: "",
      sourceCity: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Add New Bus</h2>

      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          value={newBus.status}
          onChange={(e) => setNewBus({ ...newBus, status: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Additional Inputs */}
      <div>
        <label className="block mb-1 font-medium">
          RTO Registration Number
        </label>
        <input
          type="text"
          value={newBus.rtoRegNo}
          onChange={(e) => setNewBus({ ...newBus, rtoRegNo: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>

      <div className="flex space-x-4">
        <div>
          <label className="block mb-1 font-medium">Is AC</label>
          <input
            type="checkbox"
            checked={newBus.isAc}
            onChange={(e) => setNewBus({ ...newBus, ac: e.target.checked })}
            className="h-5 w-5"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Is Sleeper</label>
          <input
            type="checkbox"
            checked={newBus.isSleeper}
            onChange={(e) =>
              setNewBus({ ...newBus, sleeper: e.target.checked })
            }
            className="h-5 w-5"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Seat Capacity</label>
        <input
          type="number"
          value={newBus.seatCapacity}
          onChange={(e) =>
            setNewBus({ ...newBus, seatCapacity: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Charging Point</label>
          <input
            type="checkbox"
            checked={newBus.chargingPoint}
            onChange={(e) =>
              setNewBus({ ...newBus, chargingPoint: e.target.checked })
            }
            className="h-5 w-5"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Complementary Food</label>
          <input
            type="checkbox"
            checked={newBus.complementary_food}
            onChange={(e) =>
              setNewBus({ ...newBus, complementary_food: e.target.checked })
            }
            className="h-5 w-5"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Sheet Pillow</label>
          <input
            type="checkbox"
            checked={newBus.sheetPelow}
            onChange={(e) =>
              setNewBus({ ...newBus, sheetPelow: e.target.checked })
            }
            className="h-5 w-5"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Toilet</label>
          <input
            type="checkbox"
            checked={newBus.toilet}
            onChange={(e) => setNewBus({ ...newBus, toilet: e.target.checked })}
            className="h-5 w-5"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Wifi</label>
          <input
            type="checkbox"
            checked={newBus.wifi}
            onChange={(e) => setNewBus({ ...newBus, wifi: e.target.checked })}
            className="h-5 w-5"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Boarding City</label>
        <input
          type="text"
          value={newBus.sourceCity}
          onChange={(e) => setNewBus({ ...newBus, sourceCity: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Boarding Point</label>
        <input
          type="text"
          value={newBus.boardingPoint}
          onChange={(e) =>
            setNewBus({ ...newBus, boardingPoint: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Departure Date</label>
          <input
            type="date"
            value={newBus.departureDate}
            onChange={(e) =>
              setNewBus({ ...newBus, departureDate: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Departure Time</label>
          <input
            type="time"
            value={newBus.departureTime}
            onChange={(e) =>
              setNewBus({ ...newBus, departureTime: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Destination City</label>
        <input
          type="text"
          value={newBus.destinationCity}
          onChange={(e) =>
            setNewBus({ ...newBus, destinationCity: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Destination Point</label>
        <input
          type="text"
          value={newBus.destinationPoint}
          onChange={(e) =>
            setNewBus({ ...newBus, destinationPoint: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Arrival Date</label>
          <input
            type="date"
            value={newBus.arrivalDate}
            onChange={(e) =>
              setNewBus({ ...newBus, arrivalDate: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Arrival Time</label>
          <input
            type="time"
            value={newBus.arrivalTime}
            onChange={(e) =>
              setNewBus({ ...newBus, arrivalTime: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
      </div>

      

      
      <div>
        <label className="block mb-1 font-medium">Bus Fare</label>
        <input
          type="number"
          value={newBus.busFare}
          onChange={(e) => setNewBus({ ...newBus, busFare: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
      >
        Add Bus
      </button>
    </form>
  );
};

export default AddBus;

// BusTable Component
const BusTable = ({ buses, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Manage Buses</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Bus Number
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Route
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Capacity
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {buses.map((bus) => (
              <tr key={bus.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{bus.rtoRegNo}</td>
                <td className="px-6 py-4 inline-flex">{bus.schedules[0].sourceCity}<FaArrowRight className="ms-2 me-2 mt-1.5 w-3"/>{bus.schedules[0].destinationCity}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bus.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {bus.active ? "Active" : "InActive"}
                  </span>
                </td>
                <td className="px-6 py-4">{bus.seatCapacity}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                       onClick={() => toast.info("Edit Bus feature will be available soon! 🚀")}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                       onClick={() => toast.info("Delete Bus feature will be available soon! 🚀")}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// StatsCards Component
const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black text-white p-6 rounded-xl">
          <div className="text-sm text-gray-300">{stat.label}</div>
          <div className="text-2xl font-bold mt-2">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

// BookingsList Component
const BookingsList = ({ bookings }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Bookings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Booking ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Bus
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Passenger
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Route
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">#{booking.id}</td>
                <td className="px-6 py-4">{booking.busName}</td>
                <td className="px-6 py-4">{booking.passenger}</td>
                <td className="px-6 py-4">
                  {booking.from} - {booking.to}
                </td>
                <td className="px-6 py-4">{booking.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", available: true },
    { id: "addBus", icon: Plus, label: "Add Bus", available: true },
    { id: "bookings", icon: Users, label: "Bookings", available: false },
    { id: "earnings", icon: DollarSign, label: "Earnings", available: false },
    { id: "feedback", icon: Star, label: "Feedback", available: false },
    { id: "support", icon: HelpCircle, label: "Support", available: false },
  ];

  const handleClick = (item) => {
    if (item.available) {
      onTabChange(item.id);
    } else {
      toast.info(`"${item.label}" will be available soon! 🚀`);
    }
  };

  return (
    <div className="w-64 bg-black text-white p-6">
      <div className="w-20 mb-2">
        <img src="./img/GoBuslogo.png" alt="" />
      </div>
      <div className="mb-8">
        <h1 className="text-xl font-bold">GoBus Operator</h1>
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${
              activeTab === item.id ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

import {useEffect } from "react";
import { toast } from "react-toastify";

const EditBus = ({ bus, onSave, onCancel }) => {
  console.log(bus);
  // Initialize form data with all bus fields.
  // In case the bus prop is not immediately available, you can set default values.
  const [formData, setFormData] = useState({
    status: bus.status || "Active",
    rtoRegNo: bus.rtoRegNo || "",
    ac: bus.ac || false,
    sleeper: bus.sleeper || false,
    seatCapacity: bus.seatCapacity || "",
    chargingPoint: bus.chargingPoint || false,
    complementary_food: bus.complementary_food || false,
    sheetPelow: bus.sheetPelow || false,
    toilet: bus.toilet || false,
    wifi: bus.wifi || false,
    arrivalDate: bus.arrivalDate || "",
    arrivalTime: bus.arrivalTime || "",
    boardingPoint: bus.boardingPoint || "",
    busFare: bus.busFare || "",
    departureDate: bus.departureDate || "",
    departureTime: bus.departureTime || "",
    destinationCity: bus.destinationCity || "",
    destinationPoint: bus.destinationPoint || "",
    sourceCity: bus.sourceCity || "",
  });

  // In case the bus prop is loaded asynchronously,
  // you can update the state when bus changes.
  useEffect(() => {
    setFormData({
      
      status: bus.active || "Active",
      rtoRegNo: bus.rtoRegNo || "",
      ac: bus.ac || false,
      sleeper: bus.sleeper || false,
      seatCapacity: bus.seatCapacity || "",
      chargingPoint: bus.chargingPoint || false,
      complementary_food: bus.complementary_food || false,
      sheetPelow: bus.sheetPelow || false,
      toilet: bus.toilet || false,
      wifi: bus.wifi || false,
      arrivalDate: bus.arrivalDate || "",
      arrivalTime: bus.arrivalTime || "",
      boardingPoint: bus.boardingPoint || "",
      busFare: bus.busFare || "",
      departureDate: bus.departureDate || "",
      departureTime: bus.departureTime || "",
      destinationCity: bus.destinationCity || "",
      destinationPoint: bus.destinationPoint || "",
      sourceCity: bus.sourceCity || "",
    });
  }, [bus]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkbox inputs, use the checked property.
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated bus data including its id
    onSave({ ...formData, id: bus.id });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* RTO Registration Number */}
        <div>
          <label className="block mb-1 font-medium">
            RTO Registration Number
          </label>
          <input
            type="text"
            name="rtoRegNo"
            value={formData.rtoRegNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        {/* AC & Sleeper */}
        <div className="flex space-x-4">
          <div>
            <label className="block mb-1 font-medium">Is AC</label>
            <input
              type="checkbox"
              name="ac"
              checked={formData.ac}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Is Sleeper</label>
            <input
              type="checkbox"
              name="sleeper"
              checked={formData.sleeper}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
        </div>

        {/* Seat Capacity */}
        <div>
          <label className="block mb-1 font-medium">Seat Capacity</label>
          <input
            type="number"
            name="seatCapacity"
            value={formData.seatCapacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        {/* Additional Facilities */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Charging Point</label>
            <input
              type="checkbox"
              name="chargingPoint"
              checked={formData.chargingPoint}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Complementary Food</label>
            <input
              type="checkbox"
              name="complementary_food"
              checked={formData.complementary_food}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Sheet Pillow</label>
            <input
              type="checkbox"
              name="sheetPelow"
              checked={formData.sheetPelow}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Toilet</label>
            <input
              type="checkbox"
              name="toilet"
              checked={formData.toilet}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Wifi</label>
            <input
              type="checkbox"
              name="wifi"
              checked={formData.wifi}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
        </div>

        {/* Source City / Boarding City */}
        <div>
          <label className="block mb-1 font-medium">Boarding City</label>
          <input
            type="text"
            name="sourceCity"
            value={formData.sourceCity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        {/* Boarding Point */}
        <div>
          <label className="block mb-1 font-medium">Boarding Point</label>
          <input
            type="text"
            name="boardingPoint"
            value={formData.boardingPoint}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        {/* Departure Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Departure Date</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Departure Time</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Destination City & Point */}
        <div>
          <label className="block mb-1 font-medium">Destination City</label>
          <input
            type="text"
            name="destinationCity"
            value={formData.destinationCity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Destination Point</label>
          <input
            type="text"
            name="destinationPoint"
            value={formData.destinationPoint}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        {/* Arrival Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Arrival Date</label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Arrival Time</label>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Bus Fare */}
        <div>
          <label className="block mb-1 font-medium">Bus Fare</label>
          <input
            type="number"
            name="busFare"
            value={formData.busFare}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export { AddBus, BusTable, StatsCards, BookingsList, Sidebar, EditBus };
