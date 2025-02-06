import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";
import {
  AddBus,
  BusTable,
  StatsCards,
  BookingsList,
  Sidebar,
  EditBus,
} from "./components";
import { getBuses } from "../services/operator";

const OperatorHomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [edit, setEdit] = useState(null);
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);

  const onLoadItems = async () => {
    try {
      const result = await getBuses();
      console.log("result", result);
      
      if (result && result.status === 'success' && Array.isArray(result.data)) {
        setBuses(result.data);
      } else {
        // Fallback: set an empty array to avoid undefined
        setBuses([]);
        alert(result && result.error ? result.error : "No data returned");
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      setBuses([]);
    }
  }

  useEffect(() => {
    // the function (1st param) will be called as soon as
    // the component gets mounted (loaded)
    console.log('component is mounted...')
    onLoadItems()

    return () => {
      // this function will get called when the component
      // gets unmounted (unloaded)
      console.log('component is unmounted...')
    }
  }, [])

  const handleAddBus = (newBus) => {
    setBuses([...buses, { ...newBus, id: buses.length + 1 }]);
    setActiveTab("dashboard");
  };

  const handleEditBus = (bus) => {
    // Implement edit functionality
    setEdit(bus);
    setActiveTab("editBus");
    console.log("Edit bus:", bus);
  };

  const handleSaveEdit = (updatedBus) => {
    setBuses(buses.map((bus) => (bus.id === updatedBus.id ? updatedBus : bus)));
    setEdit(null);
    setActiveTab("dashboard");
  };

  const handleDeleteBus = (id) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      setBuses(buses.filter((bus) => bus.id !== id));
    }
  };

  const stats = [
    { label: "Total Buses", value: buses.length },
    { label: "Active Bookings", value: bookings.length },
    { label: "Earnings", value: "$5,000" },
    { label: "Ratings", value: "4.5/5" },
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "dashboard" && (
            <>
              <StatsCards stats={stats} />
              <BusTable
                buses={buses}
                onEdit={handleEditBus}
                onDelete={handleDeleteBus}
              />
            </>
          )}
          {activeTab === "addBus" && <AddBus onAddBus={handleAddBus} />}
          {activeTab === "bookings" && <BookingsList bookings={bookings} />}

          {activeTab === "editBus" && (
            <EditBus
              bus={edit}
              onSave={handleSaveEdit}
              onCancel={() => {
                setEdit(null);
                setActiveTab("dashboard");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OperatorHomePage;
