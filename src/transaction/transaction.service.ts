import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './infrastructure/persistance/transaction.repository';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { BillerRepository } from '../biller/infrastructure/persistance/biller.repositories';
import { Transaction } from './infrastructure/persistance/document/schema/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../customer/insfrastructure/persistance/document/schema/customer.schema';

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

    if (!customer) throw new Error('Customer not found');

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
  async findOne(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
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
