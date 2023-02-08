import express from 'express';
import cors from 'cors';
import gamesRoute from './routes/gamesRoute.js';
import customersRoute from './routes/gamesRoute.js';
import rentalsRoute from './routes/rentalsRoute.js';

export const app = express();
app.use(express.json());
app.use(cors());

app.use([gamesRoute, customersRoute, rentalsRoute]);

app.listen(5000, () => {
  console.log(`Servidor iniciado na porta: 5000`);
  console.log(`Use: http://localhost:5000`);
});