
/**
 * @file transaction.controller.ts
 * @description This file contains the TransactionController class, which handles HTTP requests related to transactions.
 * It provides endpoints to create, update, fetch all transactions, and fetch a specific transaction by ID.
 * The controller uses the TransactionService to perform the necessary operations.
 */

import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Patch, 
    InternalServerErrorException, 
    NotFoundException 
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { Transaction } from './infrastructure/persistance/document/schema/transaction.schema';
  import { CreateTransactionDto } from './dto/createTransaction.dto';
  
  @Controller('transaction')
  export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
  
    // ✅ If no id is provided, return all transactions
    @Get()
    async findAll(): Promise<Transaction[]> {
      try {
        return await this.transactionService.findAll();
      } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new InternalServerErrorException('Failed to fetch transactions');
      }
    }
  
    // ✅ Update a transaction with provided id
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateTransactionDto: CreateTransactionDto,
    ): Promise<Transaction | null> {
      try {
        const updatedTransaction = await this.transactionService.update(id, updateTransactionDto);
        if (!updatedTransaction) {
          throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
        return updatedTransaction;
      } catch (error) {
        console.error(`Error updating transaction with ID ${id}:`, error);
        throw new InternalServerErrorException('Failed to update transaction');
      }
    }
  
    // ✅ If an id is provided, return the transaction with that id
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Transaction | null> {
      try {
        const transaction = await this.transactionService.findOne(id);
        if (!transaction) {
          throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
      } catch (error) {
        console.error(`Error fetching transaction with ID ${id}:`, error);
        throw new InternalServerErrorException('Failed to fetch transaction');
      }
    }
  
    // ✅ Create a new transaction with provided information
    @Post()
    async create(
      @Body() createTransactionDto: CreateTransactionDto,
    ): Promise<Transaction> {
      try {
        return await this.transactionService.create(createTransactionDto);
      } catch (error) {
        console.error('Error creating transaction:', error);
        throw new InternalServerErrorException('Failed to create transaction');
      }
    }
  }
  