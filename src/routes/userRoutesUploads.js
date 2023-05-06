import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
 
import { documentValidator } from '../helpers/validator';
import userController from '../controllers/userControllerValidator';

const user = express();

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: true }));

user.use(express.static('public'));

const storage = multer.diskStorage({
destination: function (req, file, cb) {
if (file.mimetype === 'document/pdf' || file.mimetype === 'document/msword') {
cb(null, path.join(__dirname, '../public/document'));
} 
},
filename: function (req, file, cb) {
const name = Date.now() + '-' + file.originalname;
cb(null, name);
},
});

const fileFilter = (req, file, cb) => {
 if (file.fieldname === 'document') {
file.mimetype === 'application/msword' || file.mimetype === 'application/pdf'
? cb(null, true)
: cb(null, false);
}
};

const upload = multer({
storage: storage,
fileFilter: fileFilter,
}).fields([{ name: 'document', maxCount: 1 }]);

user.post('/register', upload, documentValidator, userController.register);

export default user;