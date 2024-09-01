"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminLogin() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios
        .post("/api/auth/login", {
          username,
          password,
        })
        .then((response) => {
          toast.success(response.data.message);
          router.push("/dashboard");
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

  return (
    <section className="bg-slate-100 flex justify-center items-center min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center mt-8 mb-8">
          <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
        </div>
      ) : (
        <form
          className="container mx-auto flex flex-col bg-white max-w-[400px] p-10 space-y-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-orange-600">Login</h1>
            <p className="mt-1 mb-5 text-stone-400">
              Login to continue from where you were
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
          <button
            type="submit"
            className="bg-orange-400 border-orange-400 px-3 py-3 border font-bold  text-white w-full"
          >
            Login
          </button>
          <div className="flex justify-end text-stone-500 space-x-2 text-sm">
            <span>Don&apos;t have an account?</span>
            <Link
              href={"/register"}
              className="hover:text-orange-400 underline"
            >
              Register Here
            </Link>
          </div>
          <div className="flex justify-end text-sm underline">
            <Link href={"/"} className="text-orange-400">
              Homepage
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}
