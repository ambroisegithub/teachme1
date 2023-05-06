import multer from 'multer';
import path from 'path';
let uploadimage = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"  && ext !== ".pdf") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

const uploadDocument = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'storage/document') // Set the destination folder for the uploaded file
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

export {uploadimage,uploadDocument};

// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Set the destination folder based on the file type
//     if (file.fieldname === 'image') {
//       cb(null, path.join(__dirname, '..', 'uploads', 'images'));
//     } else if (file.fieldname === 'document') {
//       cb(null, path.join(__dirname, '..', 'uploads', 'documents'));
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 50 },
//   fileFilter: function (req, file, cb) {
//     // Only allow specific file types
//     if (file.fieldname === 'image') {
//       if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'));
//       }
//     } else if (file.fieldname === 'document') {
//       if (!file.originalname.match(/\.(pdf|txt|doc|docx)$/)) {
//         return cb(new Error('Only document files are allowed!'));
//       }
//     }
//     cb(null, true);
//   }
// }).fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }]);

// export default upload;




// import multer from 'multer';
// import path from 'path';
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Set the destination folder based on the file type
//     if (file.fieldname === 'image') {
//       cb(null, '..uploads/images');
//     } else if (file.fieldname === 'document') {
//       cb(null, 'uploads/documents');
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 50},
//   fileFilter: function (req, file, cb) {
//     // Only allow specific file types
//     if (file.fieldname === 'image') {
//       if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'));
//       }
//     } else if (file.fieldname === 'document') {
//       if (!file.originalname.match(/\.(pdf|txt|doc)$/)) {
//         return cb(new Error('Only document files are allowed!'));
//       }
//     }
//     cb(null, true);
//   }
// }).fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }]);

// export default upload;









