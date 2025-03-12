import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
