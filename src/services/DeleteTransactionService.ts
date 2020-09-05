import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);
    const transaction = await transactionsRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new AppError('Transaction was not found', 404);
    }

    await transactionsRepository.remove(transaction);

    return transaction;
  }
}

export default DeleteTransactionService;
