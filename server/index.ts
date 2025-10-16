import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANTE: Configure o CORS para aceitar BrowserStack
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://bs-local.com:5173', // BrowserStack Local
    /\.browserstack\.com$/ // Qualquer subdomínio do BrowserStack
  ],
  credentials: true
}));

app.use(express.json());

// Rotas
app.use('/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});