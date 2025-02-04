import { CreateTransactionDomain } from '../../domain/create-transaction.domain';
import { CreateTransactionDto } from '../../dto/createTransaction.dto'

export abstract class TransactionRepository {
  abstract create(createTransactionDto: CreateTransactionDto): Promise<CreateTransactionDomain>;
  abstract findAll(): Promise<any[]>;
  abstract findById(id: string): Promise<any | null>;
  abstract update(id: string, updateTransactionDto: Partial<CreateTransactionDto>): Promise<CreateTransactionDomain>;
  abstract delete(id: string): Promise<any | null>;
}

