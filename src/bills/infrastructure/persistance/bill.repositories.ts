import { CreateBillDomain } from '../../domain/create-bill.domain';

export abstract class BillRepository {
  // ✅ Create a bill
  abstract create(bill: any): Promise<CreateBillDomain>;

  // ✅ Update a bill
  abstract update(billId: string, bill: any): Promise<CreateBillDomain>;

  // ✅ find all bills
  abstract findAll(filters: Record<string, any>): Promise<any[]>;

  // ✅ find a specific bill
  abstract findById(id: string): Promise<any | null>;

  //abstract findByEmail(email: string): Promise<any | null>;

  // ✅ update multiple bills together
  abstract updateMany(filter: any, updateBillDto: Partial<CreateBillDomain>): Promise<void>;
  
  abstract findFiltered(filters: Record<string, any>): Promise<any[]>;
}
