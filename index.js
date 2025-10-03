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

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight requests are handled by the CORS middleware above

// Default route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN tutorial");
});

// Health-check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/books", bookRoute);

// Serverless-friendly Mongo connection cache
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDBURL, {
      // options can be added here if needed
    }).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Ensure connection initialized at cold start
connectToDatabase()
  .then(() => {
    console.log("App connected to DB");
    if (process.env.VERCEL !== "1") {
      app.listen(PORT, () => {
        console.log(`App started successfully on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error("Mongo connection error:", error);
  });

// Export a Vercel-compatible handler
export default function handler(req, res) {
  return app(req, res);
}
