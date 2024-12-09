"use client";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const router = useRouter();

  // Initialize token
  let token = "";
  if (typeof window !== "undefined") {
    const credentials = localStorage.getItem("Credentials");
    token = credentials ? JSON.parse(credentials) || "" : "";
  }

  let dir = token?.user?.usertype;

  const Handlelogout = async () => {
    localStorage.removeItem("Credentials");
    if (dir === "Employee") {
      router.push("/login");
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <div>
      <div className="flex justify-between px-3 text-[#fff] py-2.5 bg-blue-600">
        <div>
          <p className="font-bold">Logo</p>
        </div>
        <div className="flex gap-3">
          <div>
            <button
              className="bg-red-700 text-white text-sm px-3 py-1 rounded-md"
              onClick={Handlelogout}
            >
              {"Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
