import React from "react";

function DashBoard() {
  return (
    <div>
      <div>
        <div className="mt-3">
          <p className="font-bold text-2xl">Employee Dashboard</p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 ">
            <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-4  border-2 border-[#ccc]">
              <div className="flex items-center justify-between mb-4 border-b-2 border-[#ccc]">
                <h3 className="font-semibold text-gray-700">Your Info</h3>
                {/* <button class="text-blue-500 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-4.35-4.35M15 11a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                </button> */}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment Type</span>
                  <span className="font-medium text-gray-800">Full-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">L1 Reporting</span>
                  <span className="font-medium text-gray-800">
                    Prathyusha Daddolu
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department</span>
                  <span className="font-medium text-gray-800">IT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work Location</span>
                  <span className="font-medium text-gray-800">Telangana</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly Holidays</span>
                  <span className="font-medium text-gray-800">Sat, Sun</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-2">
                <span className="text-sm text-gray-600">
                  General Shift (09:30 - 18:30)
                </span>
                <button className="ml-4 text-blue-500 font-semibold text-sm focus:outline-none">
                  More
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-4  border-2 border-[#ccc]">
              <div className="flex items-center justify-between mb-4 border-b-2 border-[#ccc]">
                <h3 className="font-semibold text-gray-700">Attendance</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Day Absent</span>
                  <span className="font-medium text-gray-800">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600"> Approved leaves</span>
                  <span className="font-medium text-gray-800">---</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">leaves without pay</span>
                  <span className="font-medium text-gray-800">IT</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-2">
                <span className="text-sm text-gray-600">
                  General Shift (09:30 - 18:30)
                </span>
                <button className="ml-4 text-blue-500 font-semibold text-sm focus:outline-none">
                  More
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-4  border-2 border-[#ccc]">
              <div className="flex items-center justify-between mb-4 border-b-2 border-[#ccc]">
                <h3 className="font-semibold text-gray-700">Leaves</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600"> Allocations Leaves </span>
                  <span className="font-medium text-gray-800">11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Leaves Availed</span>
                  <span className="font-medium text-gray-800">22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance Leaves</span>
                  <span className="font-medium text-gray-800">22</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-2">
                <span className="text-sm text-gray-600">
                  General Shift (09:30 - 18:30)
                </span>
                <button className="ml-4 text-blue-500 font-semibold text-sm focus:outline-none">
                  More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
