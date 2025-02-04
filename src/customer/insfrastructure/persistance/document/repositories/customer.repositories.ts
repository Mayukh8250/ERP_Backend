

/**
 * @file This file contains the implementation of the CustomerDocumentRepository class,
 * which extends the CustomerRepository class. It provides methods to interact with the 
 * customer data stored in a MongoDB database using Mongoose. The repository includes 
 * methods for finding, creating, and updating customers, with optional filtering capabilities.
 * 
 * The class includes the following methods:
 * - findAll: Retrieves all customers with optional filters.
 * - findOne: Retrieves a single customer by a given filter.
 * - create: Creates a new customer with the provided information.
 * - update: Updates a customer by ID with the provided information.
 * 
 * The filters for querying customers are dynamically constructed based on the provided DTO.
 * The repository also includes commented-out sections for logging customer-related actions.
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../../document/schema/customer.schema';
import { CustomerRepository } from '../../customer.repositories';
import { CreateCustomerDto } from '../../../../dto/createCustomer.dto';
import { FilterCustomerDto } from '../../../../dto/filterCustomer.dto';

@Injectable()
export class CustomerDocumentRepository extends CustomerRepository {
  constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {
    super();
  }

 // ✅ Getting all customers with optional filters
   async findAll(filterCustomerDto: FilterCustomerDto): Promise<any[]> {
     // ✅ Return all records if no filters are provided
     if (!filterCustomerDto) {
       const customers = await this.customerModel.find().exec();
 
       // ✅ Converting into desired response
       return customers;
     }
 
     const filters: Record<string, any> = {};
 
     // ✅ Dynamically  iterate over the filterCustomerDto and construct the filters object
     Object.entries(filterCustomerDto).forEach(([key, value]) => {
       if (value) {
         if (key === 'customerName') {
           filters[key] = { $regex: value, $options: 'i' }; // ✅ Case-insensitive regex for 'name'
         } else {
           filters[key] = value; // ✅ Direct match for other fields
         }
       }
     });
 
     // ✅ Find customers after filtering
     const customers = await this.customerModel.find(filters).exec();
 
    //  // ✅ Creating logs of getting customer details
    //  const logsCreate = await this.logsService.create(
    //    `Fetched ${customers.length} number of customer after filtering`,
    //  );
 
     // ✅ Converting into desired response
     return customers;
   }
 
   // ✅ Getting a single customer by ID
   async findOne(filter: Partial<Customer>): Promise<Customer | null> {
     return await this.customerModel.findOne(filter).exec();
   }
 
   // ✅ Creating a new customer with provided information
   async create(createCustomerDto: CreateCustomerDto): Promise<any> {
     const newCustomer = new this.customerModel(createCustomerDto);
       // ✅ Creating logs of getting customer details
      //  const logsCreate = await this.logsService.create(
      //    `Created a customer Name: ${newCustomer.customerName}`,
      //  );
     return await newCustomer.save();
   }
 
   // ✅ Updating a customer by ID
   async update(id: string, customer: any): Promise<any> {
     return await this.customerModel.findByIdAndUpdate(id, customer, {
       new: true,
     });
   }
}
