import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { initDB } from './config/db';
import transactionsRoute from './routes/transactions.route';
import rateLimiter from './middleware/rate-limiter';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(rateLimiter);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'API is running',
  });
});

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
