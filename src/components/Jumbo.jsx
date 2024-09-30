'use client'
import {useState} from 'react'

export default function Jumbo() {

  const [search, setSearch] = useState ('')

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Search: ", search)
  }

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 bg-primary-bg bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-orange-600 opacity-70"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="min-h-[calc(100vh-80px)] relative flex items-center justify-center text-white">
          <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Find Your Perfect Ride
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Discover our wide range of vehicles to suit every need and budget.
              Whether you are exploring the city or heading out on a road trip,
              we have got you covered with the best rates and flexible options.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md mt-4 flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Enter car name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-md text-black"
              />
              <button type="submit" className="w-full md:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
