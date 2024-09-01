"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";

export default function DashHeader() {
  const [data, setData] = useState("processing");
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/admin");
      setData(response.data.data.username);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="bg-orange-600 flex justify-center items-center z-50 h-20 sticky top-0 right-0 left-0 py-4 px-5 lg:px-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <div className="container mx-auto flex justify-around items-center">
        {data === "processing" ? (
          <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
        ) : (
          <>
            <div className="flex flex-col space-y-2">
              <div className="leading-none text-xs font-bold text-orange-300">
                Logged in as
              </div>
              <div className="font-bold bg-white px-6 rounded-md py-2 text-xl text-orange-600 leading-none">
                {data}
              </div>
            </div>
            <button
              className="text-white font-bold flex space-x-2"
              onClick={logout}
            >
              <span>Logout</span>
              <LuLogOut size={24} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
