require("dotenv").config(); // This loads the environment variables from the .env file
const express = require("express");
const http = require("http"); // Required to create the server
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors"); // Import cors

const connectDb = require("./db.js");
const swaggerSetup = require("./swagger.js"); // Import Swagger setup

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(cors());

// Create the server with http.createServer to handle both HTTP and WebSocket
const server = http.createServer(app);

// Swagger setup
swaggerSetup(app);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// User routes
const userRoutes = require("./routes/authRoutes.js");
app.use("/api/users", userRoutes);

const inventoryRoutes = require("./routes/inventoryRoutes.js");
app.use("/api/inventory", inventoryRoutes);

// Request routes
const requestRoutes = require("./routes/requestRoutes.js");
app.use("/api/requests", requestRoutes);

// Special request routes
const specialRequestRoutes = require("./routes/specialRequestRoutes.js");
app.use("/api/special-requests", specialRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
