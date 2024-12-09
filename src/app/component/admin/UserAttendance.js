"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/app/component/common/Layout";
import { userattendence } from "@/app/hooks/useApi";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const UserAttendance = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [getData, setGetData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceToEdit, setAttendanceToEdit] = useState(null);
  const [clockin, setClockin] = useState("");
  const [clockout, setClockout] = useState("");

  // Fetch attendance data
  useEffect(() => {
    const HandleGetData = async () => {
      try {
        const response = await userattendence(id);
        setGetData(response);
      } catch (error) {
        console.log(error);
      }
    };
    HandleGetData();
  }, [id]);
  console.log("in", clockin);
  console.log("out", clockout);

  // Open edit modal
  const handleEdit = (attendance) => {
    console.log(attendance);
    setAttendanceToEdit(attendance); // Store the selected attendance to edit
    setClockin(attendance.clockIn || "");
    setClockout(attendance.clockOut || "");
    setIsModalOpen(true); // Open the modal
  };

  // Update attendance record
  const handleUpdateAttendance = async (attendanceId) => {
    const payload = {
      clockIn: clockin,
      clockOut: clockout,
    };

    try {
      await axios.put(
        `https://hr-backend-szgv.onrender.com/api/attendance/edit/${attendanceId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      // Close modal and refresh data
      setIsModalOpen(false);
      // Optionally, re-fetch the data after update
      const updatedData = await userattendence(id);
      setGetData(updatedData);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="mt-3 p-3">
        <ToastContainer />
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Attendance
          </h2>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
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
                {/* <th className="py-3 px-4 text-gray-600 font-medium">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {getData?.map((record) => (
                <tr
                  key={record._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
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
                  {/* <td className="py-3 px-4">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Attendance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Attendance</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateAttendance(attendanceToEdit._id);
              }}
            >
              <div className="mb-3">
                <label className="block text-gray-700">Clock In</label>
                <input
                  type="time"
                  value={clockin}
                  onChange={(e) => setClockin(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Clock Out</label>
                <input
                  type="time"
                  value={clockout}
                  onChange={(e) => setClockout(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserAttendance;
