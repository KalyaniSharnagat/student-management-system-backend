const express = require("express");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db.config");
const studentRoutes = require("./routes/student.routes");
const errorHandler = require("./middlewares/error.middleware");
const { initModels } = require("./models");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

initModels(); // Initialize models/associations

// Sync DB
sequelize.sync({ alter: true })
  .then(() => console.log("All tables synced"))
  .catch(err => console.error("DB Sync Error:", err));

app.use("/api/students", studentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
