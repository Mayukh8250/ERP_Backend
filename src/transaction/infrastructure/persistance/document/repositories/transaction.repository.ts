import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../schema/transaction.schema';
import { CreateTransactionDto } from '../../../../dto/createTransaction.dto';
import { TransactionRepository } from '../../transaction.repository';
import { CreateTransactionDomain } from '../../../../domain/create-transaction.domain';

@Injectable()
export class TransactionDocumentRepository implements TransactionRepository {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  // ✅ Create a new transaction
  async create(createTransactionDto: CreateTransactionDto): Promise<any | null> {
    const newTransaction = new this.transactionModel(createTransactionDto);
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
  }

  // ✅ Retrieve all transactions
  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate('customer').populate('biller').exec();
  }

  // ✅ Retrieve a transaction by ID
  async findById(billerId: string): Promise<Transaction[] | null> {
    return this.transactionModel.find({billerId:billerId}).populate('customer').populate('biller').exec();
  }

  // ✅ Update a transaction by ID
  async update(id: string, updateTransactionDto: Partial<CreateTransactionDto>): Promise<any> {
    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .exec();

    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }

    return updatedTransaction;
  }

  // ✅ Delete a transaction by ID
  async delete(id: string): Promise<Transaction | null> {
    return this.transactionModel.findByIdAndDelete(id).exec();
  }
}
