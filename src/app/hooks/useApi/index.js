import React from "react";
import axios from "axios";

// const baseURL = "http://localhost:5000";

const baseURL = "https://hr-backend-szgv.onrender.com";

// Initialize token
let token = "";
if (typeof window !== "undefined") {
  const credentials = localStorage.getItem("Credentials");
  token = credentials ? JSON.parse(credentials).token || "" : "";
}

// / ---- function of fetchData ----------- //
function fetchData(url, method, data) {
  return axios({
    method: method,
    url: `${baseURL}/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use the token directly here
    },
    data: data,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(`Error fetching data from ${url}:`, error);
      throw error;
    });
}
// Register Api ------
export function saffregister(data) {
  return fetchData("api/auth/register", "post", data);
}

// login Api ------
export function login(data) {
  return fetchData("api/auth/login", "post", data);
}

// logout Api ------
export function logout() {
  return fetchData("api/auth/logout", "get");
}

// Attendance user Api ------
export function attendaneruser() {
  return fetchData("api/attendance/my", "get");
}

export function AllEmplayeeLists() {
  return fetchData("api/auth/register/user", "get");
}

export function emplayeedelete(id) {
  return fetchData(`api/auth/delete/user/${id}`, "delete");
}

export function emplayeeEdit(id, updatedEmployee) {
  return fetchData(`api/auth/user/${id}`, "put", updatedEmployee);
}

export function clockin() {
  return fetchData("api/attendance/clockin", "post");
}

export function clockout() {
  return fetchData("api/attendance/clockout", "post");
}

// Admin login Api ------
export function adminregister(data) {
  return fetchData("api/auth/adminregister", "post", data);
}

// Admin login Api ------
export function adminlogin(data) {
  return fetchData("api/auth/adminlogin", "post", data);
}

export function userattendence(id) {
  return fetchData(`api/attendance/my/${id}`, "get");
}
