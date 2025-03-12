import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json()); // Para parsear cuerpos JSON
app.use('/auth', authRoutes); // Monta las rutas en /auth

export default app;