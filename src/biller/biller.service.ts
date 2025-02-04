import { Injectable } from '@nestjs/common';
import { BillerRepository } from './infrastructure/persistance/biller.repositories';
import { LogsService } from '../logs/logs.service';
import { CreateBillerDto } from './dto/createBiller.dto';
import { FilterBillerDto } from './dto/filterBiller.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BillerService {
  constructor(
    private readonly billerRepository: BillerRepository,
    private readonly logsService: LogsService, // ✅ Inject LogsService
  ) {}

  // ✅ Find all billers
  async findAll(filterBillerDto: FilterBillerDto) {
    const filters: Record<string, any> = {};

    const billers = await this.billerRepository.findAll(filters);
    await this.logsService.create(`Fetched billers with filters: ${JSON.stringify(filterBillerDto)}`);
    return billers;
  }

  // ✅ Find Biller with the id
  async findOne(id: string) {
    const biller = await this.billerRepository.findById(id);
    const logMessage = biller ? `Fetched biller with ID: ${id}` : `Biller with ID: ${id} not found`;
    await this.logsService.create(logMessage);
    return biller;
  }

  // ✅ Create biller with corresponding details
  async create(createBillerDto: CreateBillerDto) {
    const savedBiller = await this.billerRepository.create(createBillerDto);
    await this.logsService.create(`Created new biller: ${savedBiller.billerName} (ID: ${savedBiller.billerName})`);
    return savedBiller;
  }

  // ✅ Update biller with corresponding details
  async update(id: string, updateBillerDto: Partial<CreateBillerDto>) {
    const updatedBiller = await this.billerRepository.update(id, updateBillerDto);
    const logMessage = updatedBiller ? `Updated biller with ID: ${id}` : `Failed to update biller with ID: ${id} - Not Found`;
    await this.logsService.create(logMessage);
    return updatedBiller;
  }

  // ✅ Login biller
  async login(email: string, password: string) {
    const biller = await this.billerRepository.findByEmail(email);
    if (!biller) {
      await this.logsService.create(`Failed login attempt for biller: ${email}`);
      return { message: 'Invalid credentials', status: 401 };
    }

    const matchPassword = await bcrypt.compare(password, biller.password);
    if (!matchPassword) {
      await this.logsService.create(`Failed login attempt for biller: ${email}`);
      return { message: 'Invalid credentials', status: 401 };
    }

    await this.logsService.create(`Successful login for biller: ${email}`);
    return biller;
  }
}
