/**
 * @file This file contains the abstract class `CustomerRepository` which defines the contract for customer-related database operations.
 * It includes methods for finding all customers, finding a single customer, creating a customer, and updating a customer.
 * The repository uses Data Transfer Objects (DTOs) for creating and filtering customers.
 * 
 * @module CustomerRepository
 */

import { Customer } from '../persistance/document/schema/customer.schema';
import { CreateCustomerDomain } from '.././../domain/create-customer.domain'
import { CreateCustomerDto } from '../../dto/createCustomer.dto';
import { FilterCustomerDto } from '../../dto/filterCustomer.dto';

export abstract class CustomerRepository {
  // ✅ Find All customers
  abstract findAll(filterCustomerDto: FilterCustomerDto): Promise<Customer[]>;

  // ✅ Find single customer
  abstract findOne(filter: Partial<Customer>): Promise<Customer | null>;

  // ✅ Create customer with corresponding details
  abstract create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
  
  // ✅ Update customer of a customer
  abstract update(id: string, customer: Partial<Customer>): Promise<Customer | null>;
}
