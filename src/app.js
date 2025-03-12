import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

sequelize.sync().then(() => console.log("DB Conectada Athentication"));

export default app;
