

/**
 * @file This file contains the CustomerService class, which provides methods for managing customers
 * in the application. It includes functionalities to find all customers with optional filters, 
 * find a single customer by ID or filter, create a new customer, and update an existing customer by ID.
 * The service interacts with the CustomerRepository for data persistence and the LogsService for logging actions.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './insfrastructure/persistance/customer.repositories';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { FilterCustomerDto } from './dto/filterCustomer.dto';
import { LogsService } from '../logs/logs.service';
import { CreateCustomerDomain } from './domain/create-customer.domain';
import { Customer } from './insfrastructure/persistance/document/schema/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly logsService: LogsService,
  ) {}

  // ✅ Get all customers with optional filters
  async findAll(filterCustomerDto: FilterCustomerDto): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll(filterCustomerDto);

    // ✅ Logs created
    await this.logsService.create(`Fetched ${customers.length} customers after filtering`);

    return customers;
  }

  // ✅ Get a single customer by ID or filter
  async findOne(filter: Partial<Customer>): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne(filter);

    return customer;
  }

  // ✅ Create a new customer
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = await this.customerRepository.create(createCustomerDto);

    // ✅ Logs created
    await this.logsService.create(`Created a customer Name: ${newCustomer.customerName}`);

    return newCustomer;
  }

  // ✅ Update a customer by ID
  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    const updatedCustomer = await this.customerRepository.update(id, customer);

    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return updatedCustomer;
  }
}
