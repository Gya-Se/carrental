import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteCarModal({ isOpen, onClose, fetchCars, car }) {
  const [loading, setLoading] = useState(false);

  const handleDeleteCar = async () => {
    try {
      setLoading(true);
      await axios
        .delete(`/api/cars/${car._id}`)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });

      fetchCars();
      onClose();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h1 className="text-3xl text-center text-orange-500 font-bold mb-4">
          Delete Car
        </h1>
        {loading ? (
          <div className="flex items-center justify-center mt-8 mb-8">
            <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
          </div>
        ) : (
          <div>
            <p>
              Are you sure you want to delete the car:{" "}
              <span className="font-bold">
                {car.brand} {car.model}
              </span>
              ?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={handleDeleteCar}
                type="submit"
                className=" bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-orange-500 bg-white border border-orange-500 hover:bg-orange-50 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
