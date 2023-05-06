import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
export const uploadToCloud = async (file, res) => {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: "Blog",
      use_filename: true,
    });
    return profilePicture;
  } catch (error) {
    return res.status(500).send(error);
  }
};