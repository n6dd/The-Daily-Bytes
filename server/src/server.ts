import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sequelize from "./config/connection.js";
import apiRoutes from "./routes/api/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("../client/dist"));

app.use("/api", apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
