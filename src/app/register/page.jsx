"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminRegister() {
  const [visible, setVisible] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios
        .post("/api/auth/register", {
          username,
          password,
          code,
        })
        .then((response) => {
          toast.success(response.data.message);
          router.push("/login");
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Toggle = () => {
    setVisible(!visible);
  };

  const ToggleCode = () => {
    setVisibleCode(!visibleCode);
  };

  return (
    <section className="bg-slate-100 flex justify-center items-center min-h-screen">
      <form
        className="container mx-auto flex flex-col bg-white max-w-[400px] p-10 space-y-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-orange-600">Register</h1>
          <p className="mt-1 mb-5 text-stone-400">
            Register to enjoy admin privileges
          </p>
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            className="px-3 py-3 w-full border border-orange-400 outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            name="password"
            id="password"
            className="px-3 py-3 w-full border border-orange-400 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span className="absolute right-3 top-3">
            {visible ? (
              <IoMdEyeOff
                className="text-2xl text-stone-400 cursor-pointer bg-white"
                onClick={Toggle}
              />
            ) : (
              <IoMdEye
                className="text-2xl text-stone-400 cursor-pointer bg-white"
                onClick={Toggle}
              />
            )}
          </span>
        </div>

        <div className="relative">
          <input
            type={visibleCode ? "text" : "password"}
            name="code"
            id="code"
            className="px-3 py-3 w-full border border-orange-400 outline-none"
            placeholder="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <span className="absolute right-3 top-3">
            {visibleCode ? (
              <IoMdEyeOff
                className="text-2xl text-stone-400 cursor-pointer bg-white"
                onClick={ToggleCode}
              />
            ) : (
              <IoMdEye
                className="text-2xl text-stone-400 cursor-pointer bg-white"
                onClick={ToggleCode}
              />
            )}
          </span>
        </div>
        <button
          type="submit"
          className={`${
            loading
              ? "bg-orange-200 border-orange-200"
              : "bg-orange-400 border-orange-400"
          } px-3 py-3 border font-bold  text-white w-full`}
          disabled={loading}
        >
          {loading ? "Processing" : "Register"}
        </button>
        <div className="flex justify-end text-stone-500 space-x-2 text-sm">
          <span>Already have an account?</span>
          <Link href={"/login"} className="hover:text-orange-400 underline">
            Login Here
          </Link>
        </div>
        <div className="flex justify-end text-sm underline">
          <Link href={"/"} className="text-orange-400">
            Homepage
          </Link>
        </div>
      </form>
    </section>
  );
}
