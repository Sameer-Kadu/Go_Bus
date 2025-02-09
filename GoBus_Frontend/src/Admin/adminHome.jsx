import {useEffect, useState } from "react"
import { approve, getOperator } from "../services/operator";
import { toast } from "react-toastify";

// const operatorShape = {
//   id: 'number',
//   name: 'string',
//   agency: 'string',
//   status: 'string'
// }

// const busShape = {
//   id: 'number',
//   name: 'string',
//   route: 'string',
//   status: 'string'
// }

const AdminDashboard = () => {
  const [operators, setOperators] = useState([])
  const onLoadItems = async () => {
    try {
      const result = await getOperator();
      console.log("API Response:", result);
  
      if (result.status === 200) {
        // Ensure that `operators` is always an array
        const fetchedOperators = Array.isArray(result.data)
          ? result.data
          : result.data.operators || [];
  
        setOperators(fetchedOperators);
      } else {
        setOperators([]); // Set empty array if no data
        
toast.error(result.error || "No data returned");

        // alert(result.error || "No data returned");
      }
    } catch (error) {
      console.error("Error fetching operators:", error);
      setOperators([]); // Prevent undefined state
    }
  };
  
  
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
  const [buses, setBuses] = useState([])

  const [expandedSection, setExpandedSection] = useState("operators")

  const handleApprove = async (type, id, agencyName) => {
    
    if (type === "operator") {
     
      setOperators(operators.map((op) => (op.id === id ? { ...op, approve: true } : op)))
      
      const result = await approve(agencyName);
      console.log("result:- "+ result)
      if(result["status"] == 200)
      {
        toast.success("Operator approved successfully");
        // alert("approved")
        onLoadItems()
      }
    } else {
      setBuses(buses.map((bus) => (bus.id === id ? { ...bus, status: "Approved" } : bus)))
    }
  }

  const handleReject = (type, id) => {
    if (type === "operator") {
      setOperators(operators.map((op) => (op.id === id ? { ...op, status: "Rejected" } : op)))
    } else {
      setBuses(buses.map((bus) => (bus.id === id ? { ...bus, status: "Rejected" } : bus)))
    }
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="bg-white shadow-md p-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-indigo-600">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Operators</p>
                <h2 className="text-3xl font-bold text-gray-800">{operators.length}</h2>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending Approvals</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {operators.filter((op) => !op.approved).length +
                    buses.filter((bus) => !bus.approved).length}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Customer Feedbacks</p>
                <h2 className="text-3xl font-bold text-gray-800">28</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="space-y-8">
          {/* Operators Table */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Pending Operators</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => toggleSection("operators")}
              >
                {expandedSection === "operators" ? "▲" : "▼"}
              </button>
            </div>
            {expandedSection === "operators" && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Name</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Agency</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {operators.map((operator) => (
                        <tr key={operator.id} className="hover:bg-gray-50">
                          <td className="p-4">{operator.ownerName}</td>
                          <td className="p-4">{operator.agencyName}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              operator.approved ? "bg-amber-100 text-amber-700" :
                              operator.approved ? "bg-green-100 text-green-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {operator.approved ? "Approved" : "Pending"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => handleApprove("operator", operator.id, operator.agencyName,)}
                                disabled={operator.approved}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => toast.success("feature is currently unavailable")}
                                disabled={operator.approved}
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Buses Table */}
          {/* <div className="bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Pending Buses</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => toggleSection("buses")}
              >
                {expandedSection === "buses" ? "▲" : "▼"}
              </button>
            </div>
            {expandedSection === "buses" && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Bus Name</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Route</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {buses.map((bus) => (
                        <tr key={bus.id} className="hover:bg-gray-50">
                          <td className="p-4">{bus.name}</td>
                          <td className="p-4">{bus.route}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              bus.status === "Pending" ? "bg-amber-100 text-amber-700" :
                              bus.status === "Approved" ? "bg-green-100 text-green-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {bus.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => handleApprove("bus", bus.id)}
                                disabled={bus.status !== "Pending"}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => handleReject("bus", bus.id)}
                                disabled={bus.status !== "Pending"}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

