"use client";
import Link from "next/link";
import React, { useState } from "react";
import DashBoard from "./DashBoard";
import Attendance from "./Attendance";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className=" p-1 sm:p-4">
      {/* Tabs Navigation */}
      <div className="flex space-x-4 bg-gray-100">
        {/* Dashboard Tab */}
        <div
          onClick={() => setActiveTab(0)}
          className={`cursor-pointer border-b-2 px-3 py-2 ${
            activeTab === 0 ? "border-blue-700 bg-white" : "border-transparent"
          }`}
        >
          <span className={activeTab === 0 ? "text-blue-700" : "text-gray-700"}>
            Dashboard
          </span>
        </div>

        {/* Attendance Tab */}
        <div
          onClick={() => setActiveTab(1)}
          className={`cursor-pointer border-b-2 px-3 py-2 ${
            activeTab === 1 ? "border-blue-700 bg-white" : "border-transparent"
          }`}
        >
          <span className={activeTab === 1 ? "text-blue-700" : "text-gray-700"}>
            Attendance
          </span>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-6">
        {activeTab === 0 && (
          <div>
            <DashBoard />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <Attendance />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
