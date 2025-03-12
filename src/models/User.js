import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const User = {
  async findByUsername(username) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
    return rows[0]; // Devuelve el primer resultado o undefined
  },

  async create(username, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    return { id: result.insertId, username, role };
  }
};

export default User;