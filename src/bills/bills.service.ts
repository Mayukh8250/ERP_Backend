import { Injectable } from '@nestjs/common';
import { BillRepository } from './infrastructure/persistance/bill.repositories';
import { CreateBillDto } from './dto/createBill.dto';
import { LogsService } from '../logs/logs.service';
import { Bill } from './infrastructure/persistance/document/schema/bill.schema';
//import { mapCustomerToResponse } from './mapper/customerResponse.mapper';

@Injectable()
export class BillsService {
  constructor(
    private readonly billRepository: BillRepository, // Use repository pattern
    private readonly logsService: LogsService,
  ) {}

  // ✅ Get a single bill by customer ID
  async findMany(customerId: string,expired:boolean): Promise<any[]> {
    const billFindMany = await this.billRepository.findAll({
      customer: customerId,
      expired: expired,
    });

    // ✅ Creating logs of getting customer details
    await this.logsService.create(
      `Fetched ${billFindMany.length} number of bills for customer id: ${customerId}`,
    );

    // ✅ Converting into desired response
    return billFindMany
  }

  // ✅ Get filtered bills within a date range
  async findFiltered(startDate: string, endDate: string, billerId:string): Promise<any[]> {
    const filters = { effectiveFrom: { $gte: startDate, $lte: endDate },billerId: billerId };
    return this.billRepository.findFiltered(filters);
  }


  // ✅ Find all bills and convert in desired format
  // async findAll(): Promise<any[]> {
  //   const billsFindAll = await this.billRepository.findAll({ expired: false });

  //   // ✅ Creating logs of getting customer details
  //   await this.logsService.create(
  //     `Fetched ${billsFindAll.length} number of bills`,
  //   );

  //   return billsFindAll.map((customer) => mapCustomerToResponse(customer));
  // }

  // ✅ Create a new bill
  async create(createBillDto: CreateBillDto): Promise<any> {
    return this.billRepository.create(createBillDto);
  }

  // ✅ Updating the bills , saving effective to date
  async updateMany(filter: any, updateBillDto: Partial<CreateBillDto>): Promise<void> {
    await this.billRepository.updateMany(filter, {
      ...updateBillDto,
      effectiveTo: new Date().toISOString(),
    });
  }
}
