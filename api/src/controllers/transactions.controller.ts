import { Request, Response } from 'express';

import { sql } from '../config/db';

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !user_id || !category || amount === undefined) {
      return res
        .status(400)
        .json({ message: 'All fields are required', data: null });
    }

    const transaction = await sql`
    INSERT INTO transactions (user_id, title, amount, category)
    VALUES (${user_id}, ${title}, ${amount}, ${category})
    RETURNING *
    `;
    return res.status(201).json({
      message: 'Transaction created successfully',
      data: transaction[0],
    });
  } catch (error) {
    console.log('Error creating the transaction', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', data: null });
  }
};

const getTransactionsByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${user_id}
    `;

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No transactions found', data: [] });
    }

    return res.status(200).json({
      message: 'Transactions fetched successfully',
      data: transactions,
    });
  } catch (error) {
    console.log('Error fetching transactions', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', data: null });
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (deletedTransaction.length === 0) {
      return res
        .status(404)
        .json({ message: 'Transaction not found', data: null });
    }

    return res.status(200).json({
      message: 'Transaction deleted successfully',
      data: deletedTransaction[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', data: null });
  }
};

const getSummaryByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const balance =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${user_id}`;
    const totalIncome =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${user_id} AND category = 'income'`;

    return res.status(200).json({
      message: 'Balance fetched successfully',
      data: {
        balance: Number(balance[0].balance),
        totalIncome: Number(totalIncome[0].balance),
        totalExpenses: balance[0].balance - totalIncome[0].balance,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', data: null });
  }
};

export {
  createTransaction,
  getTransactionsByUserId,
  deleteTransaction,
  getSummaryByUserId,
};
