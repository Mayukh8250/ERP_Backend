import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CustomerUploadService } from '../../customerUpload.service';  // Import the service to handle logic

@Processor('customer-upload')  // Specify the queue name
@Injectable()
export class CustomerUploadProcessor {
  constructor(private readonly customerUploadService: CustomerUploadService) {}

  // Define the method to process jobs from the queue
  @Process()
  async processCustomerUploadJob(job: Job) {
    console.log(`Processing job with ID: ${job.id}`);
    const { batch, billerId } = job.data;
    
    try {
      // Call the method from CustomerUploadService to handle the customer upload logic
      const result = await this.customerUploadService.processBatch(batch, billerId);  // Assuming this is how your method is named

      console.log(`Successfully processed batch with billerId: ${billerId}, Batch size: ${batch.length}`);
      return result;
    } catch (error) {
      console.error('Error processing customer upload job:', error);
      throw error; // You can add custom error handling here
    }
  }
}
