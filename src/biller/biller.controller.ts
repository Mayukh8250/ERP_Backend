/**
 * @file biller.controller.ts
 * @description This file contains the BillerController class which handles HTTP requests related to billers.
 * It includes endpoints for retrieving all billers, retrieving a specific biller by ID, and creating a new biller.
 * The controller uses the BillerService to perform these operations.
 */

import { Controller, Get, Post, Body, Param, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { BillerService } from './biller.service';
import { Biller } from './infrastructure/persistance/document/schema/biller.schema';
import { CreateBillerDto } from './dto/createBiller.dto';
import { FilterBillerDto } from './dto/filterBiller.dto';

@Controller('biller')
export class BillerController {
  constructor(private readonly billerService: BillerService) {}

  // ✅ If no id is provided, return all billers
  @Get()
  async findAll(@Body() filterBillerDto: FilterBillerDto): Promise<Biller[]> {
    try {
      return await this.billerService.findAll(filterBillerDto);
    } catch (error) {
      console.error('Error fetching billers:', error);
      throw new InternalServerErrorException('Failed to fetch billers');
    }
  }

  // ✅ If an id is provided, return the biller with that id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Biller | null> {
    try {
      return await this.billerService.findOne(id);
    } catch (error) {
      console.error(`Error fetching biller with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch biller');
    }
  }

  // ✅ Create a new biller with provided information
  @Post()
  async create(@Body() createBillerDto: CreateBillerDto): Promise<Biller> {
    try {
      return await this.billerService.create(createBillerDto);
    } catch (error) {
      console.error('Error creating biller:', error);
      throw new InternalServerErrorException('Failed to create biller');
    }
  }

  // ✅ Login with email and pass
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    try {
      if (!body.email || !body.password) {
        throw new BadRequestException('Missing email or password');
      }
      return await this.billerService.login(body.email, body.password);
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Login failed');
    }
  }
}
