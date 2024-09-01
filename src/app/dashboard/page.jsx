"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddCarModal from "@/components/dash/AddCarForm";
import EditCarModal from "@/components/dash/EditCarForm";
import DeleteCarModal from "@/components/dash/DeleteCar";
import Table from "@/components/dash/Table";
import { IoMdAdd } from "react-icons/io";
import { IoBookmarksOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/cars");
      setData(response.data.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);

  const openEditModal = (car) => {
    setSelectedCar(car); // Set the selected car
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (car) => {
    setSelectedCar(car); // Set the selected car
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-8 mb-8">
          <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
        </div>
      ) : (
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <div className="flex justify-between">
            <button
              onClick={openAddModal}
              className="mb-8 flex items-center justify-between text-xl font-medium bg-green-500 hover:bg-green-700 py-2 px-3 rounded-md shadow-md text-white space-x-1"
            >
              <span>Add Car</span>
              <IoMdAdd size={24} />
            </button>
            <Link
              href={"/dashboard/booking"}
              className="mb-8 flex items-center justify-between text-xl font-medium bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded-md shadow-md text-white space-x-1"
            >
              <span>Bookings</span>
              <IoBookmarksOutline size={22} />
            </Link>
          </div>

          <Table
            data={data}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />

          <AddCarModal
            isOpen={isAddModalOpen}
            onClose={closeModals}
            fetchCars={fetchCars}
          />
          <EditCarModal
            isOpen={isEditModalOpen}
            onClose={closeModals}
            fetchCars={fetchCars}
            car={selectedCar} // Pass the selected car to the Edit modal
          />
          <DeleteCarModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            fetchCars={fetchCars}
            car={selectedCar} // Pass the selected car to the Delete modal
          />
        </div>
      )}
    </>
  );
}
