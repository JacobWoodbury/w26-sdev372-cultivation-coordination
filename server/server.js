import express from 'express';
import cors from 'cors';
import plantRoutes from './routes/plantsRouter.js';
import healthRoutes from './routes/healthRouter.js';
import plotsRouter from './routes/plotsRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', healthRoutes);
app.use('/', plantRoutes);
app.use('/', plotsRouter);

export default app
