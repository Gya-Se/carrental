// components/dash/AddCarModal.js
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddCarModal({ isOpen, onClose, fetchCars }) {
  const [carBrand, setBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddCar = async (e) => {
    e.preventDefault();

    if (!carBrand || !carModel || !carYear || !carPrice || !carImage) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("brand", carBrand);
    formData.append("model", carModel);
    formData.append("year", carYear);
    formData.append("price", carPrice);
    formData.append("image", carImage);

    try {
      setLoading(true);
      await axios
        .post("/api/cars", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });

      resetForm();
      fetchCars();
      onClose();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBrand("");
    setCarModel("");
    setCarYear("");
    setCarPrice("");
    setCarImage(null);
  };

  const Caritem = [
    {
      title: "Car Make",
      inputType: "text",
      value: carBrand,
      onChange: setBrand,
      placeholder: "Enter the car make name",
    },
    {
      title: "Car Model",
      inputType: "text",
      value: carModel,
      onChange: setCarModel,
      placeholder: "Enter the car model name",
    },
    {
      title: "Car Year",
      inputType: "number",
      value: carYear,
      onChange: setCarYear,
      placeholder: "Enter the car year",
      min: 1990,
      max: 2024,
    },
    {
      title: "Car Price",
      inputType: "number",
      value: carPrice,
      onChange: setCarPrice,
      placeholder: "Enter the car price per day",
    },
    {
      title: "Car Picture",
      inputType: "file",
      onChange: (e) => {
        if (e.target.files && e.target.files[0]) {
          setCarImage(e.target.files[0]);
        }
      },
      placeholder: "Upload the car picture",
      accept: "image/*",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h1 className="text-3xl text-center font-bold text-orange-500">Add A Car</h1>
        {loading ? (
          <div className="flex items-center justify-center mt-8 mb-8">
            <div className="w-8 h-8 border-4 border-t-4 border-orange-300 rounded-full animate-spin border-t-orange-500" />
          </div>
        ) : (
          <form onSubmit={handleAddCar} className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {Caritem.map((data) => (
                <div key={data.title} className="flex flex-col space-y-2">
                  <label htmlFor={data.title} className="font-medium">
                    {data.title}
                  </label>
                  {data.inputType !== "file" ? (
                    <input
                      id={data.title}
                      type={data.inputType}
                      className="px-3 py-2 border-2 rounded"
                      value={data.value}
                      min={data.min || undefined}
                      max={data.max || undefined}
                      placeholder={data.placeholder}
                      onChange={(e) => data.onChange(e.target.value)}
                    />
                  ) : (
                    <input
                      id={data.title}
                      type={data.inputType}
                      className="px-3 py-2 border-2 rounded"
                      onChange={data.onChange}
                      accept={data.accept}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                type="submit"
                className=" bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
              >
                Add Car
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-orange-500 bg-white border border-orange-500 hover:bg-orange-50 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
