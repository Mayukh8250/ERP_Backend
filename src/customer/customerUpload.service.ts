import { Injectable } from '@nestjs/common';
import * as XlsxPopulate from 'xlsx-populate';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { CreateBillDto } from '../bills/dto/createBill.dto';
import { CustomerService } from './customer.service';
import { BillsService } from 'src/bills/bills.service';
import { mapRepcoFormat, mapAyeFormat, generalFormat } from './mapper/customerUpload.mapper';
@Injectable()
export class CustomerUploadService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly billsService: BillsService,
  ) {}
  
  // ✅ Creating customer from details of uploaded file with batch processing
  async uploadCustomers(billerId: string, file: Express.Multer.File): Promise<any[]> {
    const customersData = await this.extractDataFromXlsx(file);
    
    //console.log("debug-1",customersData)
    let count=0
    const batchSize = 1000;
    const createdCustomers: { customer: any; bill: CreateBillDto }[] = [];


    for (let i = 0; i < customersData.length; i += batchSize) {
      count++
      const batch = customersData.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(async (customerData) => {
        const createCustomerDto = this.mapCustomerData(billerId, customerData);
      //  console.log("debug imp",createCustomerDto)
        const customer = await this.findOrCreateCustomer(createCustomerDto);
        await this.billsService.updateMany({ customer: customer.id }, { expired: true });
        const createdBill = await this.createBill(billerId, createCustomerDto, customer.id);
        const updatedBills = [...customer.bills, createdBill.id];
        await this.customerService.update(customer.id, { bills: updatedBills });
        return { customer, bill: createdBill };
      }));
      console.log("--running--",count)
      createdCustomers.push(...batchResults); // Add batch results to the final array
    }

    return createdCustomers;
  }

  // ✅ Mapping customer data according to biller
  private mapCustomerData(billerId: string, customerData: any): CreateCustomerDto {
    switch (billerId) {
      case 'RFPL00000NATZB': return mapRepcoFormat(customerData, billerId);
      case 'AYEF00000NATZB': return mapAyeFormat(customerData, billerId);
      default: return generalFormat(customerData, billerId);
    }
  }

  // ✅ Checking customer already exist or not
  private async findOrCreateCustomer(createCustomerDto: CreateCustomerDto) {
  
    let customer = await this.customerService.findOne({ customerIdentifier: createCustomerDto.customerIdentifier });
  
    // ✅  If customer dont exist then create a new customer
    if (!customer) {
      customer = await this.customerService.create(createCustomerDto);
    } else {
      console.log("Existing customer found:", customer);
    }
  
    return customer;
  }
  

  // ✅ Creating bill with corresponding data
  private async createBill(billerId: string, customerDto: CreateCustomerDto, customerId: string) {

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
    const createdBill = await this.billsService.create(createBillDto as CreateBillDto);
    return createdBill as unknown as CreateBillDto;
  }

  // ✅ Extract data from file
  private async extractDataFromXlsx(file: Express.Multer.File): Promise<any[]> {
    const workbook = await XlsxPopulate.fromDataAsync(file.buffer);
    const sheet = workbook.sheet(0);
    const [headers, ...data] = sheet.usedRange().value();
    return data.map(row => Object.fromEntries(headers.map((header, index) => [header, this.formatCellValue(row[index])]))).filter(row => Object.values(row).some(value => value !== undefined && value !== null));
  }

  private formatCellValue(value: any): any {
    return typeof value === 'number' && value > 1e12 ? value.toString() : value;
  }
}
