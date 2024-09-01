"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/register")
  )
    return null;

  return (
    <section>
      <footer className="bg-slate-900 flex justify-center items-center py-4 px-5 lg:px-0">
        <div className="container mx-auto flex flex-col items-center overflow-hidden">
          <div className="mt-16 text-white font-bold uppercase">
            <h1>Follow Us </h1>
          </div>
          <div className="flex space-x-1 md:space-x-6 text-stone-300 mt-3">
            <Link href={''} className="p-3 text-orange-500 hover:text-orange-400 hover:bg-slate-600 bg-slate-700 rounded-full">
              <FaFacebookF size={24} />
            </Link>
            <Link href={''} className="p-3 text-orange-500 hover:text-orange-400 hover:bg-slate-600 bg-slate-700 rounded-full">
              <FaXTwitter size={24} />
            </Link>
            <Link href={''} className="p-3 text-orange-500 hover:text-orange-400 hover:bg-slate-600 bg-slate-700 rounded-full">
              <CiYoutube size={24} />
            </Link>
            <Link href={''} className="p-3 text-orange-500 hover:text-orange-400 hover:bg-slate-600 bg-slate-700 rounded-full">
              <FaInstagram size={24} />
            </Link>
            <Link href={''} className="p-3 text-orange-500 hover:text-orange-400 hover:bg-slate-600 bg-slate-700 rounded-full">
              <FaLinkedinIn size={24} />
            </Link>
          </div>
          <div className="flex flex-wrap place-content-center space-x-6 text-stone-300 my-6">
            <Link href={"/"} className="py-2 md:py-0 hover:text-orange-400">
              Home
            </Link>
            <Link
              href={"/#about"}
              className="py-2 md:py-0 hover:text-orange-400"
            >
              About
            </Link>

            <Link
              href={"/login"}
              className="py-2 md:py-0 hover:text-orange-400"
            >
              Admin Login
            </Link>

            <Link
              href={"/#contact"}
              className="py-2 md:py-0 hover:text-orange-400"
            >
              Contact Us
            </Link>
            <Link href={"/#team"} className="py-2 md:py-0 hover:text-orange-400">
              Our Team
            </Link>
          </div>
        </div>
      </footer>
      <aside className="bg-slate-950 flex justify-center items-center py-4 px-5 lg:px-0">
        <div className="container mx-auto flex flex-col items-center">
          <p className="flex space-x-6 text-stone-300 my-3">
            Copyright @2024. Car Rentals
          </p>
        </div>
      </aside>
    </section>
  );
}
