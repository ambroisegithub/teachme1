import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/documents'); // specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix); // use the original fieldname and append a unique suffix
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== '.pdf' &&
      ext !== '.doc' &&
      ext !== '.docx' &&
      ext !== '.txt'
    ) {
      return callback(new Error('Only document files are allowed'));
    }
    callback(null, true);
  },
});

export default upload;



