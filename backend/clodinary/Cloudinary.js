import cloudinary from "cloudinary";



// Function to configure and connect to Cloudinary
export const cloudinaryConnect = () => {
   


  try {
    // Configuring cloudinary with credentials from environment variables
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECURE,
    });
  } catch (error) {
    // Logging any errors that occur during configuration
    console.log(error);
  }
};