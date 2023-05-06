import { check } from 'express-validator';

export const signUpValidation = [
check('document')
.custom((value, { req }) => {
if (
req.files.document[0].mimetype === 'application/msword' ||
req.files.document[0].mimetype === 'application/pdf'
) {
return true;
} else {
return false;
}
})
.withMessage('Please upload pdf or doc format'),
];