import express from 'express';
import ticketRoutes from './routes/ticket.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
app.use(express.json());
app.use('/tickets', ticketRoutes);
app.use(errorMiddleware);

export default app;
