"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function Booking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/bookings");
      setData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setShowCarDetails(true);
  };

  const closeCarDetails = () => {
    setShowCarDetails(false);
    setSelectedCar(null);
  };

  return (
    <section className="bg-white pt-16 min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center mt-8 mb-8">
          <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
        </div>
      ) : (
        <div className="container mx-auto overflow-hidden">
          <h1 className="text-3xl font-bold mb-8">Bookings</h1>
          <Link
            href={"/dashboard"}
            className="mb-8 float-right text-xl font-medium bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded-md shadow-md text-white"
          >
            Cars
          </Link>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2">
                  <span className="text-gray-200">Name</span>
                </th>
                <th className="py-2">
                  <span className="text-gray-200">Email</span>
                </th>
                <th className="py-2">
                  <span className="text-gray-200">Phone</span>
                </th>
                <th className="py-2">
                  <span className="text-gray-200">Booking Date</span>
                </th>
                <th className="py-2">
                  <span className="text-gray-200">Start Date</span>
                </th>
                <th className="py-2">
                  <span className="text-gray-200">End Date</span>
                </th>
                <th className="py-2">
                  <span className="text-gray-200">Car</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {data.map((item) => {
                const formatDate = (date) =>
                  new Date(date).toISOString().split("T")[0];
                return (
                  <tr
                    className="bg-gray-50 text-center py-32 border-b-2"
                    key={item._id}
                  >
                    <td className="py-2 text-gray-600">
                      <span className="text-center">{item.name}</span>
                    </td>
                    <td className="py-2 text-gray-600">
                      <span className="text-center">{item.email}</span>
                    </td>
                    <td className="py-2 text-gray-600">
                      <span className="text-center">{item.phone}</span>
                    </td>
                    <td className="py-2 text-gray-600">
                      <span className="text-center">
                        {formatDate(item.bookingDate)}
                      </span>
                    </td>
                    <td className="py-2 text-gray-600">
                      <span className="text-center">
                        {formatDate(item.startDate)}
                      </span>
                    </td>
                    <td className="py-2 text-gray-600">
                      <span className="text-center">
                        {formatDate(item.endDate)}
                      </span>
                    </td>
                    <td className="py-2 text-gray-600">
                      <button
                        onClick={() => handleCarClick(item.car)}
                        className="text-blue-500 underline"
                      >
                        {item.car.brand} {item.car.model}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showCarDetails && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <div className="relative h-36 mb-3">
              <Image
                src={selectedCar.image}
                alt=""
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">
              {selectedCar.brand} {selectedCar.model}
            </h2>
            <p className="flex justify-between mb-2">
              <span className="text-neutral-500">Model:</span>{" "}
              <span className="font-bold text-neutral-700">
                {selectedCar.brand}
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <span className="text-neutral-500">Model:</span>{" "}
              <span className="font-bold text-neutral-700">
                {selectedCar.model}
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <span className="text-neutral-500">Year:</span>
              <span className="font-bold text-neutral-700">
                {selectedCar.year}
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <span className="text-neutral-500">Price:</span>
              <span className="font-bold text-neutral-700">
              &#8373;
                {selectedCar.price}
                <sub>/day</sub>
              </span>
            </p>
            <p className="flex justify-between mb-2">
              <span className="text-neutral-500">Available:</span>{" "}
              <span
                className={`${
                  selectedCar.available ? "text-green-500" : "text-red-500"
                }`}
              >
                {selectedCar.available ? "Yes" : "No"}
              </span>
            </p>
            <button
              onClick={closeCarDetails}
              className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
