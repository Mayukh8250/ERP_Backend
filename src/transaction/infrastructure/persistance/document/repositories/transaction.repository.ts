/**
 * @file transaction.repository.ts
 * @description This file contains the implementation of the TransactionDocumentRepository class,
 * which provides methods to interact with the transaction data stored in MongoDB using Mongoose.
 * The repository includes methods for creating, retrieving, updating, and deleting transactions.
 * It also supports querying transactions by billerId, type, and customerIdentifier.
 *
 * @module TransactionDocumentRepository
 */

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
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  // ✅ Create a new transaction
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<any | null> {
    const newTransaction = new this.transactionModel(createTransactionDto);
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
  }

  // ✅ Retrieve all transactions
  async findAll(): Promise<Transaction[]> {
    return this.transactionModel
      .find()
      .populate('customer')
      .populate('biller')
      .exec();
  }

  // ✅ Retrieve transactions by billerId (required), and optionally by type and customerIdentifier
  async findOne(
    billerId: string,
    type?: string,
    customerIdentifier?: string,
  ): Promise<Transaction[] | null> {
    // ✅ Build dynamic query object
    const query: any = { billerId };

    if (type) {
      query.type = type; // ✅ Added type filter if provided
    }

    if (customerIdentifier) {
      query.customerIdentifier = customerIdentifier; // ✅ Added customerIdentifier filter if provided
    }

    return this.transactionModel
      .find(query)
      .populate('customer')
      .populate('biller')
      .exec();
  }

  // ✅ Update a transaction by ID
  async update(
    id: string,
    updateTransactionDto: Partial<CreateTransactionDto>,
  ): Promise<any> {
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
