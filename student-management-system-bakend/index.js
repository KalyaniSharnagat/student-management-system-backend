const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const studentRoutes = require("./src/routes/student.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API is running..." }));
app.use("/students", studentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
