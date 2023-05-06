import multer from "multer"

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'uploads/') // Set the destination folder for the uploaded file
    },
    filename: function(req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname) // Set the file name for the uploaded file
    }
  }),
  fileFilter: function(req, file, callback) {
    if (!file.originalname.match(/\.(pdf)$/)) { // Only allow PDF files
      return callback(new Error('Only PDF files are allowed'))
    }
    callback(null, true)
  }
});

export default upload
// import multer from "multer";
// import path from "path";

// const storage = (destination) =>
//   multer.diskStorage({
//     destination: destination,
//     filename: (req, file, cb) => {
//       return cb(
//         null,
//         `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//       );
//     },
//   });

// const fileUpload = (destination) =>
//   multer({
//     storage: storage(destination),
//     limits: {
//       fileSize: 10 * 1024 * 1024, //2mb,
//     },
//     fileFilter: (req, file, cb) => {
//       if (
//         file.mimetype == "image/png" ||
//         file.mimetype == "image/jpg" ||
//         file.mimetype == "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//       }
//     },
//     onError: function (err, next) {
//       return console.log("error", err);
//       next(err);
//     },
//   }).single("image");
 
  
// export default fileUpload;
