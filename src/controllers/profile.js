import ProfileModel from "../modules/profile"
import {UploadToCloud} from "../helpers/cloud.js"
import  studentModel from '../modules/StudentAccountRegisterModels'
import  BookTeachermodels from '../modules/BookTeachermodels'
import uploadDocument from "../helpers/multer2"

import bookTeachermodel from '../modules/BookTeachermodels';
export const getAllprofile = async (req, res) => {
  try {
    const Profile = await ProfileModel.find();
    return res.status(200).json({
      status: "success",
      number: Profile.length,
      Profile,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const getAllAprovedTecher = async (req,res) =>{
  try {
  const profileApproved = await ProfileModel.find({ status: "approved"});
  return  res.status(200).json({
  status:"succuss",
  data: profileApproved,
  message:"All teacher Approved"
  })
  
    }catch(err){
  return res.status(404).json({
    status:"failed",
    message:err.message
  })
    }
  }

  export const getAllBookedApprovedProfile = async (req,res) =>{
    try {
    const profileApproved = await BookTeachermodels.find({ status: "approved"});
    return  res.status(200).json({
    status:"succuss",
    data: profileApproved,
    message:"All teacher Approved"
    })
    
      }catch(err){
    return res.status(404).json({
      status:"failed",
      message:err.message
    })
      }
    }

// check apprroved teacher in  the body
// export const getAllAprovedTecher = async (req,res) =>{
// // try {
// const profileApproved = await ProfileModel.findOne({status: req.body.status});
// return  res.status(200).json({
// status:"succuss",
// data: profileApproved,
// message:"All teacher Approved"

// })

//   // }catch(err){
// return res.status(404).json({
//   status:"failed",
//   message:err.message
// })
//   }
// }
// export const CreateProfile = async (req, res) => {
//   try {
//     // Check if a file was uploaded
//     if (!req.file) {
//       throw new Error('Please upload an image file');
//     }

//     // Upload image to Cloudinary
//     const imageResult = await UploadToCloud(req.file, res);

//     // Handle document file upload with multer middleware
//    const uploadDocument = documentUpload.single('document');
//     uploadDocument(req, res, async (err) => {
//       if (err) {
//         throw new Error(err.message);
//       }

//       // Create new profile with uploaded file data
//       const newPost = await ProfileModel.create({
//         image: imageResult.secure_url,
//         document: req.file.filename,
//         exprience: req.body.exprience,
//         fullname: req.body.fullname,
//         email: req.body.email,
//         address: req.body.address,
//         date: req.body.date,
//         course: req.body.course,
//         studyingstyle: req.body.studyingstyle,
//         qualification:req.body.qualification,
//         description:req.body.description
//       });

//       // Send response with created profile data
//       res.status(201).json({
//         status: 'success',
//         message: 'Profile created successfully',
//         content: {
//           newPost,
//         },
//       });
//       return; // add return statement here
//      }
//     );
//   } catch (error) {
//     // Handle any errors that occur during profile creation
//     res.status(400).json({
//       status: 'failed',
//       error: error.message,
//     });
//   }
// };


// export const CreateProfile = async (req, res) => {
//   try {
//     const result = await UploadToCloud(req.file, res);
//     const newPost = await ProfileModel.create({
      
//       image: result.secure_url,
//       exprience: req.body.exprience,
//       fullname: req.body.fullname,
//       email: req.body.email,
//       address: req.body.address,
//       date: req.body.date,
//       course: req.body.course,
//       studyingstyle: req.body.studyingstyle,
//       qualification:req.body.qualification,
//       description:req.body.description,
//       // document: req.files.document[0].filename
      
//     });
//     return res.status(201).json({
//       status: "success",
//       message: "Profile created successfully",
//       content: {
//         newPost,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };


export const CreateProfile = async (req, res) => {
  try {
    const result = await UploadToCloud(req.file, res);
      const newPost = await ProfileModel.create({
        image: result.secure_url,
        exprience: req.body.exprience,
        fullname: req.body.fullname,
        email: req.body.email,
        address: req.body.address,
        date: req.body.date,
        course: req.body.course,
        studyingstyle: req.body.studyingstyle,
        qualification: req.body.qualification,
        description: req.body.description,
        // document: req.file ? req.file.filename : undefined,
      });

      return res.status(201).json({
        status: "success",
        message: "Profile created successfully",
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


export const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UploadToCloud(req.file, res);

    const post = await ProfileModel.findById(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    await ProfileModel.findByIdAndUpdate(id, {
      image: result.secure_url,
      exprience: req.body.exprience,
      fullname: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      date: req.body.date,
      course: req.body.course,
      studyingstyle: req.body.studyingstyle,
      qualification:req.body.qualification,
      description:req.body.description
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

export const getSingleProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await ProfileModel.findById(id);
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
export const deleteProfile = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await ProfileModel.findByIdAndDelete(id);
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

// export const bookTeachers = async (req, res) => {
//   // try {
//     const post = await ProfileModel.findById(req.params.id);
//     if (!post) {
//       return res.status(400).json({
//         status: "failed",
//         message: "book Teacher added the id not",
//       });
//     }

//     const student = await studentModel.findById(req.params.sId)
//     if (!student) {
//       return res.status(400).json({
//         status: "failed",
//         message: "student  not found",
//       });
//     }
//     if(student.parentId === req.parents._id.toString()){
//       const book = new bookTeachermodel({
//         fullName: student.fullName,
//         email: student.email,
//         dateOfbirth: student.dateOfbirth,
//         studentgender: student.gender,
//         parentId : req.parents._id
//       });
//       post.Books.push(book);
//       await post.save();
//       return res.status(201).json({
//         status: "success",
//         message: " The teacher is booked  successfully",
//         book,
//       });
//       }
//       else {
//         return res.status(403).json({
//           message : "You Are Allowed to Book Teacher Of Your Own Students"
//         })
//       }

// };

export const getBooked = async (req, res) => {
  try {
    const getBooked = await bookTeachermodel.find();
    return res.status(200).json({
      status: "success",
      number: getBooked.length,
      getBooked,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};


// import ProfileModel from "../modules/profile"
// import {UploadToCloud} from "../helpers/cloud.js"
// import bookTeachermodel from '../modules/BookTeachermodels';
// import upload from "../helpers/ multer"
// export const getAllprofile = async (req, res) => {
//   try {
//     const Profile = await ProfileModel.find();
//     return res.status(200).json({
//       status: "success",
//       number: Profile.length,
//       Profile,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };
// export const CreateProfile = async (req, res) => {
//   try {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({
//           status: "failed",
//           error: err,
//         });
//       }
//       const imageResult = await UploadToCloud(req.files.image[0], res);
//       const documentResult = await UploadToCloud(req.files.document[0], res);
//       const newPost = await ProfileModel.create({
//         image: imageResult.secure_url,
//         exprience: req.body.exprience,
//         fullname: req.body.fullname,
//         email: req.body.email,
//         adress: req.body.adress,
//         date: req.body.date,
//         course: req.body.course,
//         studyingstyle: req.body. studyingstyle,
//         document: documentResult.secure_url,  
//       });
//       return res.status(201).json({
//         status: "success",
//         message: "Profile created successfully",
//         content: {
//           newPost,
//         },
//       });
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error:error.message,
//     });
//   }
// };

// export const updateProfile = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let data = {
//       exprience: req.body.exprience,
//       fullname: req.body.fullname,
//       email: req.body.email,
//       adress: req.body.adress,
//       date: req.body.date,
//       course: req.body.course,
//       studyingstyle: req.body.studyingstyle,
//     };

//  if (req.files) {
//       // Upload image file to Cloudinary
//       if (req.files.image) {
//         const imageResult = await UploadToCloud(req.files.image[0], res);
//         data.image = imageResult.secure_url;
//       }

//       // Upload document file to Cloudinary
//       if (req.files.document) {
//         const documentResult = await UploadToCloud(req.files.document[0], res);
//         data.document = documentResult.secure_url;
//       }
//     }

//     const Profile = await ProfileModel.findById(id);
//     if (!Profile) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of Profile not found",
//       });
//     }
//     await ProfileModel.findByIdAndUpdate(id, data);

//     return res.status(200).json({
//       status: "success",
//       message: "Profile updated successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error,
//     });
//   }
// };
// export const getSingleProfile = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const Profile = await ProfileModel.findById(id);
//     if (!Profile) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of Profile not found",
//       });
//     }
//     return res.status(200).json({
//       status: "success",
//       Profile,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error,
//     });
//   }
// };
// export const deleteProfile = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const Profile = await ProfileModel.findByIdAndDelete(id);
//     if (!Profile) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of Profile not found",
//       });
//     }
//     return res.status(204).json({
//       status: "success",
//       message: "Profile deleted successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error,
//     });
//   }
// };

// export const bookTeachers = async (req, res) => {
//   try {
//     const post = await ProfileModel.findById(req.params.id);
//     if (!post) {
//       return res.status(400).json({
//         status: "failed",
//         message: "book Teacher added the id not",
//       });
//     }
//     const book = new bookTeachermodel({
//       name: req.body.name,
//       email: req.body.email,
//       book: req.body.book,
//     });
//     post.Books.push(book);
//     await post.save();
//     return res.status(201).json({
//       status: "success",
//       message: " The teacher is booked  successfully",
//       book,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "success",
//       error: error,
//     });
//   }
// };

// export const getBooked = async (req, res) => {
//   try {
//     const getBooked = await bookTeachermodel.find();
//     return res.status(200).json({
//       status: "success",
//       number: getBooked.length,
//       getBooked,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };




// ===============================booking  teacher ==============================

export const teacherbooking = async (req, res) => {
  // try {
    const post = await ProfileModel.findById(req.params.Tid);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "book Teacher added the id not",
      });
    }

    const student = await studentModel.findById(req.params.sId)
    if (!student) {
      return res.status(400).json({
        status: "failed",
        message: "student  not found",
      });
    }
    if(student.parentId === req.parents._id.toString()){
      const book = new bookTeachermodel({
        teacherID: post._id,
        teacherFullName: post.fullname,
        teacheremail: post.email,

        studentfullName: student.studentfullName,
        studentemail: student.studentemail,
        studentId: student._id,
        dateOfbirth: student.dateOfbirth,
        studentgender: student.gender,

        parentname: req.parents.name,
  
        parentId : req.parents._id,
        parentemail: req.parents.email
      });
      await book.save();
      return res.status(201).json({
        status: "success",
        message: " The teacher is booked  successfully",
        book,
      });
      }
      else {
        return res.status(403).json({
          message : "You Are Allowed to Book Teacher Of Your Own Students"
        })
      }

};