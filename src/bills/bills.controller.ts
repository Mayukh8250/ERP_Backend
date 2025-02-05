/**
 * @file bills.controller.ts
 * @description This file contains the BillsController class which handles HTTP requests for bill-related operations.
 * It includes methods for creating a new bill, retrieving all bills, and retrieving multiple bills by ID.
 **/
import { Controller } from '@nestjs/common';
import { Bill } from './infrastructure/persistance/document/schema/bill.schema'; // Adjust the import path as necessary
import { Get, Post, Body, Param ,Query} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/createBill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // ✅ create bill with corresponding details
  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    try {
      
      return this.billsService.create(createBillDto);
    } catch (err) {
      throw new Error('Error while creating bills');
    }
  }

  // ✅ Find all bill alongside customer detail
  // @Get()
  // findAll() {
  //   return this.billsService.findAll(
  // 
  // 
  // );
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //     return this.billsService.findOne(id);
  // }

  // ✅ Get bills of a particular customer whose id is passed
  @Post(':id')
  async findMany(
    @Param('id') id: string,
    @Body() body: { expired: boolean },
  ): Promise<Bill[] | null> {
    try {
      return await this.billsService.findMany(id, body.expired);
    } catch (error) {
      console.error('Error fetching bills:', error);
      throw new Error('Failed to fetch bills');
    }
  }
 
  // ✅ Get filtered bills within a date range
  @Get()
async findFilteredBill(
  @Query('startDate') startDate: string,
  @Query('endDate') endDate: string,
  @Query('billerId') billerId: string
): Promise<Bill[] | null> {
  try {
    return this.billsService.findFiltered(startDate, endDate, billerId);
  } catch (error) {
    console.error('Error fetching filtered bills:', error);
    throw new Error('Failed to fetch filtered bills');
  }
}
  
}
