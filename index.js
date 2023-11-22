const express = require("express");
const app = express();
const pool = require("./db"); // Adjust the path if needed.
const cors = require("cors");
require("dotenv").config();

var corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
};

// Then use corsOptions in your CORS middleware setup
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//app.use("/api/v1", baseRoutes);
app.use("/user", require("./routes/user/userRoute"));
app.use("/products", require("./routes/product/productRoute"));


// Start the server on a specific port (e.g., 3000).
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
