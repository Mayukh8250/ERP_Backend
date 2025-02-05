import { CreateTransactionDomain } from '../../domain/create-transaction.domain';
import { CreateTransactionDto } from '../../dto/createTransaction.dto';
import { Transaction } from './document/schema/transaction.schema';

export abstract class TransactionRepository {
  abstract create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<CreateTransactionDomain>;
  abstract findAll(): Promise<Transaction[]>;
  abstract findOne(
    billerId: string,
    type: string,
    customerIdentifier: string,
  ): Promise<any | null>;
  abstract update(
    id: string,
    updateTransactionDto: Partial<CreateTransactionDto>,
  ): Promise<CreateTransactionDomain>;
  abstract delete(id: string): Promise<any | null>;
}
