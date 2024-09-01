"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";

const Links = [
  { id: 1, link: "/#search", name: "Browse Cars" },
  { id: 2, link: "/#about", name: "About" },
  { id: 3, link: "/#team", name: "Our team" },
  { id: 4, link: "/#testimonials", name: "Testimonials" },
  { id: 5, link: "/#contact", name: "Contact Us" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const closeSidebar = () => {
    setToggle(!toggle);
  };

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/register")
  )
    return null;

  return (
    <>
      <header className="bg-orange-600 flex justify-center items-center z-50 h-20 sticky top-0 right-0 left-0 py-4 px-5 lg:px-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center">
            <Link className="text-white font-bold text-2xl" href={"/"}>
              Car Rental
            </Link>
          </div>

          <div className="hidden md:flex text-slate-700 space-x-1">
            {/* Admin Login */}
            {Links.map((item) => {
              const active = pathname.startsWith(item.link);
              return (
                <Link
                  href={item.link}
                  key={item.id}
                  className={`${
                    active ? "bg-orange-500" : ""
                  } px-3 py-3 font-bold text-white text-nowrap`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden z-50 col-span-4 flex justify-end">
            <Hamburger
              toggled={toggle}
              toggle={setToggle}
              easing="ease-in"
              rounded
              label="Show menu"
              color="#fff"
              distance="sm"
              size={30}
            />
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <aside
        className={`${
          toggle ? "translate-y" : "-translate-y-80"
        } z-10 md:hidden fixed mt-20 top-0 left-0 bg-orange-400 p-5 w-full border-r flex items-center justify-center transition-all duration-500`}
      >
        <div className="flex flex-col w-full text-slate-700 text-sm ">
          {Links.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                onClick={closeSidebar}
                className="p-3 border-b border-orange-300 text-center text-white  font-bold first:border-t"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
