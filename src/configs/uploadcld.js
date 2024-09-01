import cloudinary from "@/configs/cloudinary";

const uploadImageToCloudinary = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "cars" }, // Optional folder name
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          resolve(result);
        }
      }
    );
    stream.end(imageBuffer); // End the stream with the image buffer
  });
};

export default uploadImageToCloudinary;
