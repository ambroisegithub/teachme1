import express from "express"
import {
getSinglecontact,
deletecontact,
updatecontact,
Createcontact,
getAllcontact,
replyContact
} from "../controllers/contactUsController"

const router = express.Router();
router.post("/replyContact/:id",replyContact)
router.post("/Createcontact",Createcontact)
router.get("/getAllcontact",getAllcontact)
router.route("/contact/:id").get(getSinglecontact).delete(deletecontact)
router.route("/contact1/:id").delete(deletecontact)
router.patch("/updatecontact/:id",updatecontact)



/**
 * @swagger
 * /api/v1/getAllcontact:
 *   get:
 *     tags:
 *       - contact
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 number:
 *                   type: number
 *                   example: 2
 *                 contac:
 *                   type: array
 * /api/v1/Createcontact:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       description: Contact information to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       '201':
 *         description: Created contact successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "contact created successfully"
 *                 content:
 *                   type: object
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "failed"
 *                 error:
 *                   type: string
 * /api/v1/contact/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact to retrieve
 *     responses:
 *       '200':
 *         description: Retrieved contact successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *       '400':
 *         description: Invalid ID or ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "failed"
 *                 message:
 *                   type: string
 *
 * /api/v1/updatecontact/{id}:
 *   patch:
 *     summary: Update an existing contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact to update
 *     requestBody:
 *       description: Contact information to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       '200':
 *         description: Updated contact successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "contact updated successfully"
 *                 content:
 *                   type: object
 *       '400':
 *         description: Invalid request body or ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: Message returned by the API
 *                   example: Contact updated successfully
 *       400:
 *         description: Invalid request or contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                   example: failed
 *                 error:
 *                   type: string
 *                   description: Error message returned by the API
 *                   example: Contact not found
 *
 * /api/v1/contact1/{id}:
 *   delete:
 *     summary: Deletes a contact by ID
 *     description: Deletes the contact with the specified ID from the database.
 *     tags:
 *       - contact
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contact to delete.
 *     responses:
 *       204:
 *         description: The contact was successfully deleted from the database.
 *       400:
 *         description: The specified ID was not found in the database.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: failed
 *             message:
 *               type: string
 *               example: Id of post not found
 *       500:
 *         description: An error occurred while processing the request.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: failed
 *             error:
 *               type: string
 *               example: Internal Server Error
 *
 * /api/v1/replyContact/{id}:
 *   post:
 *     summary: Reply to a contact us message
 *     tags:
 *       - [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact us message to reply to
 *       - in: body
 *         name: reply
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *               description: The email of the user who submitted the contact us message
 *             message:
 *               type: string
 *               required: true
 *               description: The reply message to send to the user
 *         required: true
 *         description: The reply message to send to the user
 *     responses:
 *       201:
 *         description: The contact us message is replied successfully
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: The contact us is replied successfully
 *             reply:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: example@gmail.com
 *                 message:
 *                   type: string
 *                   example: This is a reply message
 *       400:
 *         description: Failed to reply to the contact us message or contact us message with the provided id not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: failed
 *             message:
 *               type: string
 *               example: Failed to reply to the contact us message or contact us message with the provided id not found
 *             error:
 *               type: string
 *               example: Error message
 */

export default router;