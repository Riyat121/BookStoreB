// import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import bookRoute from "./routes/bookRoute.js";
// import cors from "cors";

// const app = express();

// // Middleware
// app.use(express.json());

// // CORS setup
// app.use(
//   cors({
//     origin: "https://book-store-f-delta.vercel.app", // ✅ no slash
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// // Preflight (important for POST/PUT/DELETE)
// app.options("*", cors());

// // Default route
// app.get("/", (req, res) => {
//   return res.status(200).send("Welcome to MERN tutorial");
// });

// // Routes
// app.use("/books", bookRoute);

// // Connect to DB and start server
// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App connected to DB");
//     app.listen(PORT, () => {
//       console.log(`App started successfully on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });


import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// //middleware

app.use(server.json());

//cors

const cors = require('cors');

app.use(cors({

    origin: '*', // Allow all origins

    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods

    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers

}));

// Preflight (important for POST/PUT/DELETE)
app.options("*", cors());

// Default route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN tutorial");
});

// ✅ Health-check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "✅ Backend is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/books", bookRoute);

// Connect to DB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App started successfully on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
