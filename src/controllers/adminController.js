import nodemailer from "nodemailer"
import studentModels from "../modules/StudentAccountRegisterModels"
import BookTeachermodels from "../modules/BookTeachermodels"
import ProfileModel from "../modules/profile"
export const profilerequest= async (req, res) => {
    try {
      const profileRequest = await ProfileModel.findById(req.params.id);
      let emailSubject;
      let emailBody;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      if (!profileRequest) {
        return res.status(404).json({ message: 'Profile request not found' });
      }
      if (req.body.status === 'approved') {
        profileRequest.status = req.body.status;
        await profileRequest.save();
        // ============message========================
        emailSubject = 'Profile Confirmation';
        emailBody = `<p>Dear ${profileRequest.fullname},</p>
                     <p>Your Application has been confirmed.</p>
                     <p>Profile details:</p>
                     <ul>
                      `;
          // ============================================
        res.json({ message: 'Profile request approved successfully' });
      } else if (req.body.status === 'denied'){
        profileRequest.status = req.body.status;
        await profileRequest.save();
        // ===================mesage====================
        emailSubject = 'Booking Rejection';
        emailBody = `<p>Dear ${profileRequest.fullname},</p>
                 <p>Your Application has been dinied.</p>
                 <p>Please contact us for more details.</p>`;
        res.json({ message: 'Profile request dinied successfully' });
      }
      else {
        res.status(400).json({ message: 'Invalid Profile request status' });
      }
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: profileRequest.email,
        subject: emailSubject,
        html: emailBody
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update Profile request' });
    }
  };

  export const StudentsRequest= async (req, res) => {
    try {
      const StudentsRequest = await studentModels.findById(req.params.id);
      let emailSubject;
      let emailBody;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      if (!StudentsRequest) {
        return res.status(404).json({ message: 'Students request not found' });
      }
      if (req.body.status === 'approved') {
        StudentsRequest.status = req.body.status;
        await StudentsRequest.save();
        // ============message========================
        emailSubject = 'Student Confirmation';
        emailBody = `<p>Dear ${StudentsRequest.fullName},</p>
                     <p>Your Application has been confirmed.</p>
                   
                     <ul>
                      `;
          // ============================================
        res.json({ message: 'Student request approved successfully' });
      } else if (req.body.status === 'denied'){
        StudentsRequest.status = req.body.status;
        await StudentsRequest.save();
        // ===================mesage====================
        emailSubject = 'Booking Rejection';
        emailBody = `<p>Dear ${StudentsRequest.fullName},</p>
                 <p>Your Application has been dinied.</p>
                 <p>Please contact us for more details.</p>`;
        res.json({ message: 'Student request dinied successfully' });
      }
      else {
        res.status(400).json({ message: 'Invalid Student request status' });
      }
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: StudentsRequest.email,
        subject: emailSubject,
        html: emailBody
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update Profile request' });
    }
  };

  export const BookTeacherRequest= async (req, res) => {
    try {
      const BookTeacherrequest = await BookTeachermodels.findById(req.params.id);
      let emailSubject;
      let emailBody;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      if (!BookTeacherrequest) {
        return res.status(404).json({ message: 'Booking profile request not found' });
      }
      if (req.body.status === 'approved') {
        BookTeacherrequest.status = req.body.status;
        await BookTeacherrequest.save();
        // ============message========================
        emailSubject = 'Booking profile Confirmation';
        emailBody = `<p>Dear ${BookTeacherrequest.parentname},</p>
                     <p>Your Application has been confirmed.</p>
                   
                     <ul>
                      `;
          // ============================================
        res.json({ message: 'Booking profile request approved successfully' });
      } else if (req.body.status === 'denied'){
        BookTeacherrequest.status = req.body.status;
        await BookTeacherrequest.save();
        // ===================mesage====================
        emailSubject = 'Booking  Rejection';
        emailBody = `<p>Dear ${BookTeacherrequest.parentname},</p>
                 <p>Your Application has been dinied.</p>
                 <p>Please contact us for more details.</p>`;
        res.json({ message: 'Booking profile request dinied successfully' });
      }
      else {
        res.status(400).json({ message: 'Invalid Booking profile request status' });
      }
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: BookTeacherrequest.parentemail,
        subject: emailSubject,
        html: emailBody
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update Profile request' });
    }
  };