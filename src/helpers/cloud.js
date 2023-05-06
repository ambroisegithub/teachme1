


import cloudinary from "cloudinary"
import dotenv from "dotenv";
dotenv.config();
// cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
export const UploadToCloud = async (file,res)=>{
    try{
  const profilePicture = await cloudinary.uploader.upload(file.path, {
  folder: "image",
  use_filename: true,
});
return profilePicture;
    }catch(error){
return res.status(400).json({
      message:error
});
    }
};





// import cloudinary from "cloudinary"
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARYNAME,
//   api_key: process.env.APIKEY,
//   api_secret: process.env.APISECRET,
// });

// export const UploadToCloud = async (file, res) => {
//   try {
//     const ext = path.extname(file.originalname);
//     let folder;
//     const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];
//     const documentExtensions = [".pdf", ".doc", ".docx", ".txt"];
//     if (imageExtensions.includes(ext.toLowerCase())) {
//       folder = "image";
//     } else if (documentExtensions.includes(ext.toLowerCase())) {
//       folder = "documents";
//     } else {
//       throw new Error("Unsupported file format");
//     }
//     const uploadedFile = await cloudinary.uploader.upload(file.path, {
//       folder: folder,
//       use_filename: true,
//     });
//     return uploadedFile;
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };



// import cloudinary from "cloudinary";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARYNAME,
//   api_key: process.env.APIKEY,
//   api_secret: process.env.APISECRET,
// });

// export const UploadToCloud = async (file, res) => {
//   try {
//     const ext = path.extname(file.originalname);
//     let folder;
//     const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];
//     const documentExtensions = [".pdf", ".doc", ".docx", ".txt"];
//     if (imageExtensions.includes(ext.toLowerCase())) {
//       folder = "image";
//     } else if (documentExtensions.includes(ext.toLowerCase())) {
//       folder = "documents";
//     } else {
//       throw new Error("Unsupported file format");
//     }
//     const options = {
//       folder: folder,
//       use_filename: true,
//     };
//     console.log(`Uploading file with options: ${JSON.stringify(options)}`);
//     const uploadedFile = await cloudinary.uploader.upload(file.path, options);
//     console.log(`File uploaded successfully: ${uploadedFile.url}`);
//     return uploadedFile;
//   } catch (error) {
//     console.error(`Error uploading file: ${error.message}`);
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };
