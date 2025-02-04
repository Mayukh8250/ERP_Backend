/**
 * This controller handles all customer-related operations.
 * It includes endpoints for creating, updating, retrieving, and uploading customer details.
 *
 * @module CustomerController
 */

/**
 * Handles requests related to customer operations.
 *
 * @class
 * @classdesc This controller provides endpoints to manage customers, including creating, updating, retrieving, and uploading customer details.
 *
 * @param {CustomerService} customerService - Service to handle customer operations.
 * @param {CustomerUploadService} customerUploadService - Service to handle customer file uploads.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomerService } from './customer.service';
import { CustomerUploadService } from './customerUpload.service';
import { Customer } from './insfrastructure/persistance/document/schema/customer.schema';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { FilterCustomerDto } from './dto/filterCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerUploadService: CustomerUploadService,
  ) {}

  // ✅ Get all the customers applying filters
  @Get()
  async findAll(
    @Body() filterCustomerDto: FilterCustomerDto,
  ): Promise<Customer[]> {
    try {
      return await this.customerService.findAll(filterCustomerDto);
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new InternalServerErrorException('Failed to fetch customers');
    }
  }

  // ✅ Update customer details
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.customerService.update(id, updateCustomerDto);
    } catch (error) {
      console.error(`Error updating customer with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  // ✅ Find one single customer by customerIdentifier
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    try {
      const customer = await this.customerService.findOne({
        customerIdentifier: id,
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      return customer;
    } catch (error) {
      console.error(`Error fetching customer with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch customer');
    }
  }

  // ✅ Create customer
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.customerService.create(createCustomerDto);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  // ✅ Upload customer details file and save into database alongside biller ID
  @Post('upload/:billerId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCustomers(
    @Param('billerId') billerId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Customer[]> {
    try {
      if (!file) {
        throw new BadRequestException('File is required for upload');
      }
      return await this.customerUploadService.uploadCustomers(billerId, file);
    } catch (error) {
      console.error(`Error uploading customers for biller ID ${billerId}:`, error);
      throw new InternalServerErrorException('Failed to upload customers');
    }
  }
}
