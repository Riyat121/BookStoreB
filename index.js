import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from 'cors';
const app = express();

// Middleware
app.use(express.json());

//middleware for handling cors policy 
app.use(
    cors({
      origin:'http://localhost:5173',
      methods:['GET','POST','PUT','DELETE'],
      allowedHeaders:['Content-Type'],  
    })
)

// Default route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN tutorial");
});

app.use('/books',bookRoute);

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
