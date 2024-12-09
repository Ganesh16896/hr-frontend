"use client";
import React, { useEffect, useState } from "react";
import {
  AllEmplayeeLists,
  emplayeedelete,
  emplayeeEdit,
} from "@/app/hooks/useApi";
import axios from "axios";
import Link from "next/link";

const EmplayeeeList = () => {
  const [allList, setAllList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch all employees
  const HandleAllList = async () => {
    try {
      const resposer = await AllEmplayeeLists();
      setAllList(resposer.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleAllList();
  }, []);

  // Delete employee
  const handlerDelete = async (id) => {
    try {
      await emplayeedelete(id);
      HandleAllList();
    } catch (error) {
      console.log(error);
    }
  };

  // Open edit modal
  const handlerEdit = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee for editing
    setIsModalOpen(true); // Open the modal
  };

  // Update employee details
  const handleUpdateEmployee = async (updatedEmployee) => {
    console.log(updatedEmployee);
    try {
      await emplayeeEdit(updatedEmployee._id, updatedEmployee);
      HandleAllList();
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 px-3">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          All Employee List
        </h2>

        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 text-gray-600 font-medium">
                  Join Date
                </th>
                <th className="py-3 px-4 text-gray-600 font-medium">
                  Full Name
                </th>
                <th className="py-3 px-4 text-gray-600 font-medium">Email</th>
                <th className="py-3 px-4 text-gray-600 font-medium">
                  Attendent
                </th>
                <th className="py-3 px-4 text-gray-600 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {allList?.map((res, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{res.createAt}</td>
                  <td className="py-3 px-4">{res.name}</td>
                  <td className="py-3 px-4">{res.email}</td>
                  <td className="py-3 px-4  ">
                    <Link
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                      href={`/admin/allemplayee/attendence?id=${res._id}`}
                    >
                      view
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <button
                        className="p-1 text-white rounded-md bg-red-600"
                        onClick={() => handlerDelete(res._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="p-1 text-white rounded-md bg-blue-600"
                        onClick={() => handlerEdit(res)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateEmployee}
        />
      )}
    </div>
  );
};

export default EmplayeeeList;

// Modal Component
const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    // Call the save function with updated data
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border  rounded"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
              onClick={onClose}
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
  );
};
