import express from 'express';
import {
  createTransaction,
  getTransactionsByUserId,
  deleteTransaction,
  getSummaryByUserId,
} from '../controllers/transactions.controller';

const router = express.Router();

router.post('/', createTransaction);
router.get('/:user_id', getTransactionsByUserId);
router.delete('/:id', deleteTransaction);
router.get('/summary/:user_id', getSummaryByUserId);

export default router;
