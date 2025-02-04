/**
 * @file biller.repositories.ts
 * @description This file contains the implementation of the BillerDocumentRepository class, which provides methods for interacting with the Biller collection in MongoDB using Mongoose.
 * 
 * @class BillerDocumentRepository
 * @implements BillerRepository
 * 
 * @description The BillerDocumentRepository class implements the BillerRepository interface and provides methods to perform CRUD operations on the Biller collection in MongoDB.
 * 
 * @method findOne - Not implemented. Throws an error if called.
 * @method findAll - Retrieves all Biller documents that match the provided filters.
 * @method findById - Retrieves a Biller document by its billerId.
 * @method findByEmail - Retrieves a Biller document by its email.
 * @method create - Creates a new Biller document with a hashed password.
 * @method update - Updates an existing Biller document by its id.
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Biller } from '../schema/biller.schema';
import { CreateBillerDto } from '../../../../dto/createBiller.dto';
import {BillerRepository} from '../../biller.repositories'
import * as bcrypt from 'bcrypt';

@Injectable()
export class BillerDocumentRepository implements BillerRepository{
  constructor(@InjectModel(Biller.name) private readonly billerModel: Model<Biller>) {}
  findOne(arg0: { billerId: string; }): void {
    throw new Error('Method not implemented.');
  }

   // ✅ Find billers applying the filters( email,id, name )
  async findAll(filters: Record<string, any>): Promise<Biller[]> {
    return this.billerModel.find(filters).exec();
  }

   // ✅ find a specific biller with biller id 
  async findById(billerId: string): Promise<Biller | null> {
    return this.billerModel.findOne({billerId:billerId}).exec();
  }

   // ✅ find a biller with email
  async findByEmail(email: string): Promise<Biller | null> {
    return this.billerModel.findOne({ email }).exec();
  }

   // ✅ create a biller with corresponding details
  async create(createBillerDto: CreateBillerDto): Promise<Biller> {
    const hashedPassword = await bcrypt.hash(createBillerDto.password, 10);
    createBillerDto.password = hashedPassword; // Replace plain password with hashed one
    const newBiller = new this.billerModel(createBillerDto);
    return newBiller.save();
  }

  // ✅ update biller
  async update(id: string, updateBillerDto: Partial<CreateBillerDto>): Promise<any | null> {
    return this.billerModel.findByIdAndUpdate(id, updateBillerDto, { new: true }).exec();
  }
}
