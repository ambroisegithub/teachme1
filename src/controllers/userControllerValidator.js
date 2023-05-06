import { validationResult } from 'express-validator';

const register = async (req, res) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}

res.status(200).send({
    success: true,
    data: req.body,
    image: req.files.image[0].filename,
    document: req.files.document[0].filename,
  });
} catch (error) {
    res.status(400).send({ success: false, msg: error.message });
    }
    };
    
    export default {
    register,
    };