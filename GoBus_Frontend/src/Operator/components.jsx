import React, { useState } from 'react';
import { Bell, Bus, Home, Plus, Settings, Star, DollarSign, Users, HelpCircle, Edit2, Trash2 } from 'lucide-react';

// AddBus Component
const AddBus = ({ onAddBus }) => {
  const [newBus, setNewBus] = useState({
    name: '',
    route: '',
    capacity: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBus(newBus);
    setNewBus({ name: '', route: '', capacity: '', status: 'Active' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Add New Bus</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bus Name</label>
          <input
            type="text"
            required
            value={newBus.name}
            onChange={(e) => setNewBus({...newBus, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
          <input
            type="text"
            required
            value={newBus.route}
            onChange={(e) => setNewBus({...newBus, route: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
          <input
            type="number"
            required
            value={newBus.capacity}
            onChange={(e) => setNewBus({...newBus, capacity: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={newBus.status}
            onChange={(e) => setNewBus({...newBus, status: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
          Add Bus
        </button>
      </form>
    </div>
  );
};

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
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bus Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Route</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Capacity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {buses.map((bus) => (
              <tr key={bus.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{bus.name}</td>
                <td className="px-6 py-4">{bus.route}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    bus.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {bus.status}
                  </span>
                </td>
                <td className="px-6 py-4">{bus.capacity}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button onClick={() => onEdit(bus)} className="text-gray-600 hover:text-gray-900">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => onDelete(bus.id)} className="text-red-600 hover:text-red-900">
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Booking ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bus</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Passenger</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Route</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">#{booking.id}</td>
                <td className="px-6 py-4">{booking.busName}</td>
                <td className="px-6 py-4">{booking.passenger}</td>
                <td className="px-6 py-4">{booking.from} - {booking.to}</td>
                <td className="px-6 py-4">{booking.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
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
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'addBus', icon: Plus, label: 'Add Bus' },
    { id: 'bookings', icon: Users, label: 'Bookings' },
    { id: 'earnings', icon: DollarSign, label: 'Earnings' },
    { id: 'feedback', icon: Star, label: 'Feedback' },
    { id: 'support', icon: HelpCircle, label: 'Support' }
  ];

  return (
    <div className="w-64 bg-black text-white p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">GoBus Operator</h1>
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center space-x-3 p-2 w-full rounded-lg ${
              activeTab === item.id ? 'bg-white/10' : 'hover:bg-white/5'
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

const EditBus = ({ bus, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: bus.name,
        route: bus.route,
        status: bus.status,
        capacity: bus.capacity
    })
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSave({ ...formData, id: bus.id })
    }
  
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Edit Bus Details</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bus Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
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
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
  
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  }


export { AddBus, BusTable, StatsCards, BookingsList, Sidebar, EditBus };