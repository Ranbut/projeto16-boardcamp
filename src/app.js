import express from 'express';
import cors from 'cors';
import gamesRoute from './routes/gamesRoute.js';
import customersRoute from './routes/customersRoute.js';
import rentalsRoute from './routes/rentalsRoute.js';

export const app = express();
app.use(express.json());
app.use(cors());

app.use([gamesRoute, customersRoute, rentalsRoute]);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
  console.log(`Use: http://localhost:${process.env.PORT}`);
});