import pool from "../config/db.js";

class UserModel {
    static async findByUsername(username) {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
        return rows[0];
    }

    static async createUser(username, passwordHash) {
        const [result] = await pool.query("INSERT INTO usuarios (username, password) VALUES (?, ?)", [username, passwordHash]);
        return result.insertId;
    }
}

export default UserModel;

