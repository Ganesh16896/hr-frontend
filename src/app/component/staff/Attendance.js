"use client";
import React, { useEffect, useState } from "react";
import { clockin, clockout, attendaneruser } from "@/app/hooks/useApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Attendance = () => {
  const [getData, setGetData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const HandleGetData = async () => {
    try {
      const response = await attendaneruser();
      console.log(response);
      setGetData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    HandleGetData();
  }, []);

  // Filtered data based on search and dropdown selection
  // const filteredData = getData.filter((record) => {
  //   const matchesSearch = record.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesStatus = filterStatus === "" || record.status === filterStatus;
  //   return matchesSearch && matchesStatus;
  // });

  const HandleClockin = async () => {
    try {
      const response = await clockin();
      console.log(response);
      HandleGetData();
      toast.success(response?.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };

  const HandleClockout = async () => {
    try {
      const response = await clockout();
      console.log(response);
      HandleGetData();
      toast.success(response?.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };

  if (getData === null) {
    return <div>Loading...</div>; // Render loading state until data is fetched
  }

  return (
    <div>
      <div className="mt-3">
        <ToastContainer /> {/* Add ToastContainer here */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Attendance
          </h2>
          <div className="flex gap-2">
            <div>
              <button
                onClick={HandleClockin}
                className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-md"
              >
                {"Check In"}
              </button>
            </div>
            <div>
              <button
                onClick={HandleClockout}
                className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-md"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
        {/* <div className="flex gap-4 flex-wrap content-center justify-between">
          <div className="flex gap-4 content-center flex-wrap">
            <div>
              <label className="mr-2">Form</label>
              <input
                type="date"
                className="border-2 border-black/50 px-3 py-1"
              />
            </div>
            <div>
              <label>---</label>
            </div>
            <div>
              <label className="mr-2">To</label>
              <input
                type="date"
                className="border-2 border-black/50 px-3 py-1"
              />
            </div>

            <div>
              <button className="bg-blue-700 text-white p-2 rounded-md">
                Download pdf
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-6">
              Status Dropdown
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border-2 border-gray-300 px-3 w-[200px] py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
          </div>
        </div> */}
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                {/* <th className="py-3 px-4 text-gray-600 font-medium">Name</th> */}
                <th className="py-3 px-4 text-gray-600 font-medium">Date</th>
                <th className="py-3 px-4 text-gray-600 font-medium">
                  Login Time
                </th>
                <th className="py-3 px-4 text-gray-600 font-medium">
                  Logout Time
                </th>

                <th className="py-3 px-4 text-gray-600 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-600 font-medium">
                  Working Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {getData?.map((record) => (
                <tr
                  key={record._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* <td className="py-3 px-4">{record.name}</td> */}
                  <td className="py-3 px-4">
                    {record.createdAt.split("T")[0] || "---"}
                  </td>

                  <td className="py-3 px-4">{record?.clockIn || "---"}</td>
                  <td className="py-3 px-4">{record?.clockOut || "---"}</td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      record.status === "Full Day"
                        ? "text-green-600"
                        : record.status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {record.status || "---"}
                  </td>
                  <td className="py-3 px-4">
                    {record.totalHours || "---"} hrs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
