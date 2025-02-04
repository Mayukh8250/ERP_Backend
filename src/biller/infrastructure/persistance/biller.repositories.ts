
/**
 * @file biller.repositories.ts
 * @description This file contains the abstract class `BillerRepository` which defines the contract for the repository layer 
 * responsible for handling CRUD operations related to billers in the application. The methods in this class are intended to 
 * be implemented by concrete repository classes that interact with the data source.
 * 
 * @module BillerRepository
 * 
 * @method create - Abstract method to create a new biller.
 * @method update - Abstract method to update an existing biller by its ID.
 * @method findAll - Abstract method to retrieve all billers based on provided filters.
 * @method findById - Abstract method to find a biller by its ID.
 * @method findByEmail - Abstract method to find a biller by its email.
 */

// biller.repositories.ts (abstract class)
import { CreateBillerDomain } from '../../domain/create-biller.domain';

export abstract class BillerRepository {
  findOne(arg0: { billerId: string; }) {
    throw new Error('Method not implemented.');
  }
  // ✅ The 'create' method now takes a 'biller' object and returns a CreateBillerDomain
  abstract create(biller: any): Promise<CreateBillerDomain>;

  // ✅ The 'update' method now takes a 'billerId' and a 'biller' object, returning CreateBillerDomain
  abstract update(billerId: string, biller: any): Promise<CreateBillerDomain>;

  // ✅ Adding other abstract methods for consistency with CRUD operations
  abstract findAll(filters: Record<string, any>): Promise<any[]>;  // ✅ Returns an array of billers

  abstract findById(id: string): Promise<any | null>;  // ✅ Returns a single biller or null

  abstract findByEmail(email: string): Promise<any | null>;  // ✅ Returns a biller by email or null
}
