import { Injectable } from '@nestjs/common';
import * as XlsxPopulate from 'xlsx-populate';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { CreateBillDto } from '../bills/dto/createBill.dto';
import { CustomerService } from './customer.service';
import { BillsService } from 'src/bills/bills.service';
import {
  mapRepcoFormat,
  mapAyeFormat,
  generalFormat,
} from './mapper/customerUpload.mapper';
import chalk from 'chalk';
const debug = require('debug')('Donation:server');
const className = chalk.red.bgGreenBright('Services --> Upload');

@Injectable()
export class CustomerUploadService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly billsService: BillsService,
  ) {}

  // Uploads customer data from an Excel file, processes it in parallel batches, and creates or updates customer records and their associated bills.
  async uploadCustomers(
    billerId: string,
    file: Express.Multer.File,
  ): Promise<any[]> {
    const customersData = await this.extractDataFromXlsx(file);
    let count = 0;
    const batchSize = 1000;
    const createdCustomers: { customer: any; bill: CreateBillDto }[] = [];

    // Divide data into batches
    // Declare the batches array with an explicit type
    const batches: any[][] = [];

    for (let i = 0; i < customersData.length; i += batchSize) {
      const batch = customersData.slice(i, i + batchSize);
      batches.push(batch); // Now this should work without error
    }

    // Run batches concurrently using Promise.all
    const batchResults = await Promise.all(
      batches.map(async (batch, index) => {
        count++;
        const batchResults = await this.processBatch(batch, billerId); // Process each batch
        console.log(`Batch #${count} processed successfully`);
        debug(
          `${className} Numbers of customers and bills processed so far: ${count * batchSize}`,
        );
        return batchResults;
      }),
    );

    // Flatten the results from each batch
    batchResults.forEach((batchResult) => {
      createdCustomers.push(...batchResult);
    });

    return createdCustomers;
  }

  // New method to process batches in the background
  async processBatch(batch: any[], billerId: string): Promise<any[]> {
    const createdCustomers: { customer: any; bill: CreateBillDto }[] = [];
    for (const customerData of batch) {
      const createCustomerDto = this.mapCustomerData(billerId, customerData);
      const customer = await this.findOrCreateCustomer(createCustomerDto);

      // Expire old bills for the customer
      await this.billsService.updateMany(
        { customer: customer.id },
        { expired: true },
      );

      // Create new bill for the customer
      const createdBill = await this.createBill(
        billerId,
        createCustomerDto,
        customer.id,
      );

      // Update customer with the new bill reference
      const updatedBills = [...customer.bills, createdBill.id];
      await this.customerService.update(customer.id, { bills: updatedBills });

      createdCustomers.push({ customer, bill: createdBill });
    }
    return createdCustomers;
  }

  // Mapping customer data according to biller
  private mapCustomerData(
    billerId: string,
    customerData: any,
  ): CreateCustomerDto {
    switch (billerId) {
      case 'RFPL00000NATZB':
        return mapRepcoFormat(customerData, billerId);
      case 'AYEF00000NATZB':
        return mapAyeFormat(customerData, billerId);
      default:
        return generalFormat(customerData, billerId);
    }
  }

  // Checking if customer already exists or not
  private async findOrCreateCustomer(createCustomerDto: CreateCustomerDto) {
    let customer = await this.customerService.findOne({
      customerIdentifier: createCustomerDto.customerIdentifier,
    });

    // If customer doesn't exist, create a new customer
    if (!customer) {
      customer = await this.customerService.create(createCustomerDto);
    }

    return customer;
  }

  // Creating bill with corresponding data
  private async createBill(
    billerId: string,
    customerDto: CreateCustomerDto,
    customerId: string,
  ) {
    const createBillDto: Partial<CreateBillDto> = {
      customer: customerId,
      billerId,
      billAmount: customerDto.billAmount ?? 0,
      dueDate: customerDto.dueDate ?? '',
      principleOs: customerDto.principleOs ?? '',
      loanAmount: customerDto.loanAmount ?? '',
      emi: customerDto.emi ?? '',
      billNumber: customerDto.billNumber ?? '',
      billDate: customerDto.billDate ?? '',
      billUpdatedOn: customerDto.billUpdateOn,
      billPeriod: customerDto.billPeriod ?? '',
      minAmount: customerDto.minAmount ?? '',
      branchName: customerDto.branchName ?? '',
      loanDue: customerDto.loanDue ?? '',
      expired: false,
    };
    const createdBill = await this.billsService.create(
      createBillDto as CreateBillDto,
    );
    return createdBill as unknown as CreateBillDto;
  }

  // Extract data from the Excel file
  private async extractDataFromXlsx(file: Express.Multer.File): Promise<any[]> {
    const workbook = await XlsxPopulate.fromDataAsync(file.buffer);
    const sheet = workbook.sheet(0);
    const [headers, ...data] = sheet.usedRange().value();
    return data
      .map((row) =>
        Object.fromEntries(
          headers.map((header, index) => [
            header,
            this.formatCellValue(row[index]),
          ]),
        ),
      )
      .filter((row) =>
        Object.values(row).some(
          (value) => value !== undefined && value !== null,
        ),
      );
  }

  // Format cell value to handle large numbers
  private formatCellValue(value: any): any {
    return typeof value === 'number' && value > 1e12 ? value.toString() : value;
  }
}
