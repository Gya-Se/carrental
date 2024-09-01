"use client";

import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import Postcard from "./PostCard";
import axios from "axios";
import toast from "react-hot-toast";

export default function RecentlyAdded() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      await axios
        .get("/api/cars")
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (carId) => {
    setSelectedCarId(carId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCarId(null);
  };

  return (
    <section className="px-5 md:px-0 container mx-auto overflow-hidden" id="search">
      {loading ? (
        <div className="flex items-center justify-center mt-8 mb-8">
          <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
        </div>
      ) : (
        <div className="pt-16">
          <div className="mb-6">
            <h1 className="font-bold text-2xl text-orange-600">Browse Cars</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data &&
              data.map((item) => (
                <Postcard
                  key={item._id}
                  image={item.image}
                  brand={item.brand}
                  year={item.year}
                  model={item.model}
                  price={item.price}
                  available={item.available}
                  onBookNow={() => openModal(item._id)}
                />
              ))}
          </div>
          <BookingModal
            isOpen={isModalOpen}
            onClose={closeModal}
            carId={selectedCarId}
          />
        </div>
      )}
    </section>
  );
}
