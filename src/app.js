
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import StudentAccountRegisterRoutes from "../src/routes/StudentAccountRegisterRoutes"
import assignmentRoutes from "../src/routes/assignmentsRoutes"
import UserRoute from "./routes/user"
import contactUsRoutes from "./routes/contactUsRoutes"

import teacher from "../src/routes/Teacher"
import student from "../src/routes/Student"

import videoRoutes from "../src/routes/course"
import postRoute from "../src/routes/routesProfile"
import payment from "../src/routes/payment"
import getAllAttempt from "../src/routes/attempt"
import blog from "../src/routes/blog"
// import router from '../src/routes/course';
// import upload from "./helpers/multer"
const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API documentation",
      version: "1.0.0",
      description: "All blog endpoint API documentation using swagger",
    },
    servers: [
      {
              url:"http://localhost:7777",
        // url: "https://teachmeapi.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/modules/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use(cors());
app.use(morgan("dev"));

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(upload.single("image"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/v1", postRoute);
// app.use(express.static("public"))
app.use("",StudentAccountRegisterRoutes)
app.use("/api/v1",teacher)
app.use("/api/v1",student)
app.use("/api/v1",assignmentRoutes)
app.use("/api/v1",contactUsRoutes)
app.use("/api/v1",postRoute); 
app.use("/api/v1",videoRoutes); 
app.use("/api/v1",UserRoute);
app.use("/api/v1",getAllAttempt)
// app.use("/api/v1",router)
app.use("/api/v1",blog);
app.use("",payment)
app.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    author: req.user,
    message: "Welcome to my API",
  });
});

// Multer Error File Handling
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) { // Multer-specific errors
//       return res.status(418).json({
//           err_code: err.code,
//           err_message: err.message,
//       });
//   } else { // Handling errors for any other cases from whole application
//       return res.status(500).json({
//           err_code: 409,
//           err_message: "Something went wrong!"
//       });
//   }
// });
app.use('/user', express.static('storage/images'))

app.use("*", (req, res) => {
  return res.status(404).json({
    status: "failed",
    message: "Invalid URL",
  });
});
export default app;

// import swaggerUi from "swagger-ui-express"
// import swaggerJsDoc from "swagger-jsdoc"
// import StudentAccountRegisterRoutes from "../src/routes/StudentAccountRegisterRoutes"
// import assignmentRoutes from "../src/routes/assignmentsRoutes"
// import UserRoute from "./routes/user"
// import contactUsRoutes from "./routes/contactUsRoutes"
// import qiuzRoutes from "../src/routes/QuizRoute"
// import postRoute from "../src/routes/routesProfile"
// // import blog from "../src/routes/blog"
// import upload from "./helpers/multer"
// import bodyParser from "body-parser";
// import morgan from "morgan";
// import express from "express";
// import cors from "cors";
// const app = express();
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("public"))
// app.use("",StudentAccountRegisterRoutes)
// app.use("/api/v1",qiuzRoutes)
// app.use("/api/v1",assignmentRoutes)
// app.use("/api/v1",contactUsRoutes)
// app.use("/api/v1",postRoute); 
// app.use("/api/v1",UserRoute);
// // app.use("/api/v1",blog);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(upload.single("image"));

// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My APIs documentation",
//       version: "1.0.0",
//       description: "This is my A documentation",
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           in: "header",
//           bearerformat: "JWT",
//         },
//       },
//     },
//     securit: [
//       {
//         bearerAuth: [],
//       },
//     ],
//     servers: [
//       {
//         // url:"http://localhost:5550",
//         url: "https://teachmeapi.onrender.com",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.js", "./src/modules/*.js"],
// };
// const specs = swaggerJsDoc(options);
// app.use(cors());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.use("*", (req, res) => {
//   return res.status(404).json({
//     status: "failed",
//     message: "Invalid URL",
//   });
// });
// export default app;