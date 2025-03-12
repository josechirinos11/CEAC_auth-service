import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    static async register(req, res) {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await UserModel.createUser(username, hashedPassword);
        
        res.status(201).json({ message: "Usuario registrado", userId });
    }

    static async login(req, res) {
        const { username, password } = req.body;

        const user = await UserModel.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login exitoso", token });
    }
}

export default AuthController;
