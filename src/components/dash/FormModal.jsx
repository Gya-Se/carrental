import { useState, useEffect } from "react";
import axios from "axios";

export default function FormModal({ isOpen, onClose, carId }) {
  const [cars, setCars] = useState([]);
  const [carBrand, setBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (carImage) {
      const objectUrl = URL.createObjectURL(carImage);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [carImage]);

  // Fetch cars
  const fetchCars = async () => {
    try {
      await axios
        .get("/api/cars")
        .then((response) => {
          console.log(response.data.data);
          setCars(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching cars:", error);
        });
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // Add or update car data
  const handleAddOrUpdateCar = async (e) => {
    e.preventDefault();

    if (!carBrand || !carModel || !carYear || !carPrice || !carImage) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    console.log(carImage);

    const formData = new FormData();
    formData.append("brand", carBrand);
    formData.append("model", carModel);
    formData.append("year", carYear);
    formData.append("price", carPrice);
    formData.append("availability", true);
    formData.append("image", carImage);

    try {
      //Edit car
      if (editMode) {
        await axios
          .put(`/api/cars/${currentCarId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            alert("Car updated successfully");
            setEditMode(false);
          })
          .catch((err) => {
            alert("Failed to update car");
          });
      }
      // Add car
      else {
        await axios
          .post("/api/cars", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            alert("Car added successfully");
            resetForm();
            fetchCars();
          })
          .catch((err) => {
            alert("Failed to add car");
          });
      }

      resetForm();
      fetchCars();
    } catch (error) {
      console.error("Error adding/updating car:", error);
      alert("An error occurred while processing the car.");
    }
  };

  const handleEditCar = (car) => {
    setBrand(car.brand);
    setCarModel(car.model);
    setCarYear(car.year);
    setCarPrice(car.price);
    setCarImage(null); // reset the image
    setImagePreview(car.imageUrl); // assume the backend returns an imageUrl
    setCurrentCarId(car._id);
    setEditMode(true);
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios
        .delete(`/api/cars/${carId}`)
        .then(() => {
          console.log("Car deleted successfully");
          fetchCars();
        })
        .catch((err) => {
          console.error("Error deleting car:", err);
          alert("An error occurred while deleting the car.");
        });
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("An error occurred while deleting the car.");
    }
  };

  const resetForm = () => {
    setBrand("");
    setCarModel("");
    setCarYear("");
    setCarPrice("");
    setCarImage(null);
    setImagePreview(null);
    setEditMode(false);
    setCurrentCarId(null);
  };

  const Caritem = [
    {
      title: "Car Brand",
      inputType: "text",
      value: carBrand,
      onChange: setBrand,
      placeholder: "Enter the car brand name",
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
      <div className="bg-white p-6 rounded-md w-[600px]">
        <h1 className="text-3xl font-bold">
          {editMode ? "Edit Car" : "Add A Car"}
        </h1>
        <form onSubmit={handleAddOrUpdateCar} className="mt-6">
          <div className="space-y-4">
            {Caritem.map((data) => (
              <div key={data.title} className="flex flex-col space-y-2">
                <label htmlFor={data.title} className="font-medium">
                  {data.title}
                </label>
                {data.inputType !== "file" ? (
                  <input
                    id={data.title}
                    type={data.inputType}
                    className="px-3 py-2 border-2 focus:outline-none rounded w-full"
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

          <div className=" mt-5">
            <h1 className="font-medium mb-2">Satus</h1>
            <div className="">
              <input
                type="radio"
                name="status"
                id="radioDefault1"
                value="True"
                className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault1"
                className="inline-block text-gray-600"
              >
                Available
              </label>
            </div>
            <div className="">
              <input
                type="radio"
                name="status"
                id="radioDefault2"
                value="False"
                className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault2"
                className="inline-block text-gray-600"
              >
                Unavailable
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="mt-12 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              {editMode ? "Update Car" : "Add Car"}
            </button>
            {editMode && (
              <button
                type="button"
                className="ml-4 mt-12 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md mt-12"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
