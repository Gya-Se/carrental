// Function to extract public ID from the Cloudinary URL
const extractPublicIdFromUrl = (url) => {
  // Assuming the URL is of the form:
  // https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/public-id.extension
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const pub = publicIdWithExtension.split(".")[0]; // Remove extension
  const publicId = "cars/" + pub;
  return publicId;
};

export default extractPublicIdFromUrl;
