/**
 * @file BillDocumentRepository
 * @description This file contains the implementation of the BillDocumentRepository class,
 *  which is responsible for interacting with the MongoDB database to perform CRUD operations on Bill documents.
 * @module BillDocumentRepository
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill, BillDocument } from '../schema/bill.schema';
import { CreateBillDto } from '../../../../dto/createBill.dto';
import { BillRepository } from '../../bill.repositories';
import { CreateBillDomain } from 'src/bills/domain/create-bill.domain';
import {mapCustomerToResponse} from '../mappers/customerResponse.mapper'

@Injectable()
export class BillDocumentRepository implements BillRepository {
  constructor(@InjectModel(Bill.name) private readonly billModel: Model<BillDocument>) {}

  // ✅ find all bills with or without filter (specific customer and expire boolean status)
  async findAll(filters: Record<string, any>): Promise<any[]> {
    const billFind= await this.billModel.find(filters).populate('customer').exec();
    return billFind.map((customer) => mapCustomerToResponse(customer));
  }

  // ✅ find a specific bill
  async findById(id: string): Promise<Bill | null> {
    return this.billModel.findById(id).exec();
  }

   // ✅ find filtered bills within a date range
   async findFiltered(filters: Record<string, any>): Promise<any[]> {
    const filteredBills= await this.billModel.find({
      effectiveFrom: { $gte: new Date(filters.effectiveFrom.$gte).toISOString(), $lte: new Date(filters.effectiveFrom.$lte).toISOString() },
      billerId: filters.billerId
    }).populate('customer').exec();
    return filteredBills.map((customer) => mapCustomerToResponse(customer));
  }

  // ✅ find by email
  // async findByEmail(email: string): Promise<Bill | null> {
  //   return this.billModel.findOne({ email }).exec();
  // }

  // ✅ Create a new bill with corresponding data
  async create(createBillDto: CreateBillDto): Promise<any> {
    const newBill = new this.billModel(createBillDto);
    return newBill.save();
  }

  // ✅ Update a bill with id passed
  async update(billId: string, bill: any): Promise<CreateBillDomain> {
    const updatedBill = await this.billModel.findByIdAndUpdate(billId, bill, { new: true }).exec();
    if (!updatedBill) {
      throw new Error('Bill not found');
    }
    return updatedBill as unknown as CreateBillDomain;
  }

  // ✅  update multiple bills
  async updateMany(filter: any, updateBillDto: Partial<CreateBillDto>): Promise<void> {
    await this.billModel.updateMany(filter, updateBillDto).exec();
  }
  
}
