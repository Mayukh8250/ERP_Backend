
/**
 * @fileoverview This file contains the TransactionService class, which provides methods for managing transactions
 * in the application. The service interacts with the TransactionRepository, BillerRepository, and Customer model
 * to perform CRUD operations on transactions. It includes methods for creating, finding, updating, and removing
 * transactions, with appropriate validation and debugging.
 * 
 * @module TransactionService
 */

import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './infrastructure/persistance/transaction.repository';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { BillerRepository } from '../biller/infrastructure/persistance/biller.repositories';
import { Transaction } from './infrastructure/persistance/document/schema/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../customer/insfrastructure/persistance/document/schema/customer.schema';
import chalk from 'chalk';
const debug = require('debug')('Donation:server');
const className = chalk.cyanBright('Services --> Transaction');

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly billerRepository: BillerRepository,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<any> {
    // ✅ Validate Biller existence
    const biller = await this.billerRepository.findById(
      createTransactionDto.billerId,
    );
    if (!biller) throw new Error('Biller not found');

    // ✅ Validate Customer existence using Mongoose Model
    const customer = await this.customerModel.findOne({
      customerIdentifier: createTransactionDto.customerIdentifier,
    });

    if (!customer) {
      // ✅ Debugger
      debug(`${className} Transaction created for Donation biller :${biller.billerName}, no customer find here`);
      
      return this.transactionRepository.create({
        ...createTransactionDto,
        biller: biller._id,
      });
    };

    // ✅ Debugger
    debug(`${className} Transaction created for customer: ${customer.customerName} biller :${biller.billerName}`);

    // ✅ Create the transaction with references
    return this.transactionRepository.create({
      ...createTransactionDto,
      biller: biller._id,
      customer: customer._id,
    });
  }

  // ✅  Find all transaction
  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  // ✅  Find single transaction
  async findOne(billerId: string, type:string, customerIdentifier:string): Promise<Transaction | null> {
    // ✅ Debugger
    debug(`${className} Transaction found for billerId ${billerId}`)
    return this.transactionRepository.findOne(billerId,type,customerIdentifier);
  }

  // ✅ update a transaction
  async update(
    id: string,
    updateTransactionDto: CreateTransactionDto,
  ): Promise<any | null> {
    return this.transactionRepository.update(id, updateTransactionDto);
  }

  // ✅ remove a transaction
  async remove(id: string): Promise<Transaction | null> {
    return this.transactionRepository.delete(id);
  }
}
