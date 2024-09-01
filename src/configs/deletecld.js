import cloudinary from "./cloudinary";

// Function to delete an image from Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Error deleting image:", error);
  }
};

export default deleteImageFromCloudinary;
