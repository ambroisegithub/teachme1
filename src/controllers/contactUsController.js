import nodemailer from "nodemailer";
import replycontactModel from "../modules/replyContact"
import contactUsModel from "../modules/contactUsModel";
export const getAllcontact = async (req, res) => {
  try {
    const contac = await contactUsModel.find();
    return res.status(200).json({
      status: "success",
      number: contac.length,
      contac,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};
export const Createcontact = async (req, res) => {
  try {
    const newPost = await contactUsModel.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message, 
     });

     let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    // Send an email notification to the provided email address
    let info = await transporter.sendMail({
      from: "muhayimana21@gmail.com",
      to: req.body.email,
      subject: "New Contact Form Submission",
      html: `<p>Thank you for contacting us, ${req.body.name}!</p>
             <p>We have received your message and will get back to you shortly.</p>
             <p>Here are the details of your submission:</p>
             <ul>
               <li>Name: ${req.body.name}</li>
               <li>Email: ${req.body.email}</li>
               <li>Message: ${req.body.message}</li>
             </ul>`,
    });

    return res.status(201).json({
      status: "success",
      message: "contact created successfully",
      content: {
        newPost,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};


export const replyContact = async (req, res) => {
  try {
    const post = await contactUsModel.findById(req.params.id);
    console.log("post:", post);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "contact us with the provided id not found",
      });
    }
    const reply = new replycontactModel({
      email: req.body.email,
      message: req.body.message,
    });


    // send email to user with reply message
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Reply for your contact us query",
      text: `Hi, Thank you for contacting us. See Our reply in below line\n\ Message From team: ${req.body.message}\n\nBest Regards,\nSupport Team`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).json({
          status: "failed",
          message: "Failed to send email to user",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(201).json({
          status: "success",
          message: "The contact us is replied successfully",
          reply,
        });
      }
    });
    console.log("reply:", reply);
    post.Reply.push(reply);
    await post.save();
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const updatecontact = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await contactUsModel.findById(id)
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    await contactUsModel.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
 });

    return res.status(200).json({
      status: "success",
      message: "Post updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error,
    });
  }
};

export const getSinglecontact= async (req, res) => {
  try {
    const id = req.params.id;
    const post = await contactUsModel.findById(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    return res.status(200).json({
      status: "success",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error,
    });
  }
};
export const deletecontact = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await contactUsModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error,
    });
  }
};
