import multer from 'multer';
import path from 'path';
const uploadVideo = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'storage/video'); // Set the destination folder for the uploaded file
    },
    filename: function(req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname); // Set the file name for the uploaded file
    }
  }),
  fileFilter: function(req, file, callback) {
    const allowedExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(extname)) {
      return callback(new Error('Only video files with extensions .mp4, .avi, .mov, .wmv, .flv, .mkv are allowed'));
    }
    callback(null, true);
  }
});

export {uploadVideo};
