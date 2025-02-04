/**
 * @file This file contains mapping logic for customer data from different file formats
 * to the CreateCustomerDto format used in the application.
 * 
 * The file includes two mapping functions:
 * 1. `mapRepcoFormat` - Maps customer data for  (Repco Finance).
 * 2. `mapAyeFormat` - Maps customer data for  (Aye Finance).
 * 
 * Both functions take customer data and a biller ID as input and return a CreateCustomerDto object.
 */
import { CreateCustomerDto } from '../dto/createCustomer.dto';


//✅ Mapping logic for the first file format --> Repco Finance
export const mapRepcoFormat = (customerData: any, billerId: string): CreateCustomerDto => {
  return {
    customerIdentifier: customerData['ACCT-ID'],
    customerName: customerData['CUSTOMER NAME'],
    billAmount: customerData['MAX AMT'],
    principleOs: customerData['Principle OS'] || '',
    loanAmount: customerData['LOAN AMOUNT'] || '',
    emi: customerData['EMI'] || '',
    loanDue: customerData['LOAN DUE'] || '',
    minAmount: customerData['MIN AMT'] || '',
    branchName: customerData['BRANCH NAME'] || '',
    billDate: '',
    dueDate: '',
    billUpdateOn: '',
    billPeriod: '',
    billerId: billerId,
    billNumber: '',
  };
};

//✅ Mapping logic for the second file format --> Aye Finance
export const mapAyeFormat = (customerData: any, billerId: string): CreateCustomerDto => {
  return {
    customerIdentifier: customerData['Customer identifier 1'],
    customerName: customerData['Customer name'],
    billAmount: customerData['Bill Amount '],
    billDate: customerData['Bill date (dd-mm-yyyy)'],
    dueDate: customerData['Due date (dd-mm-yyyy)'],
    billUpdateOn: customerData['Bill info updated on (dd-mm-yyyy)'],
    billPeriod: customerData['Bill period '],
    billerId: customerData['Biller id'],
    billNumber: customerData['Bill number'] || '',
    principleOs: '',
    loanAmount: '',
    emi: '',
    loanDue: '',
    minAmount: '',
    branchName: '',
  };

};

//✅ Mapping logic for all sheet who has generalised format
export const generalFormat = (customerData: any, billerId: string): CreateCustomerDto => {
  return {
    customerIdentifier: customerData['Customer Identifier'] || '', //✅ Required
    customerName: customerData['Customer Name'] || '', //✅ Required
    billAmount: customerData['Bill Amount'] || '', //✅ Required
    principleOs: customerData['Principle Os'] || '',
    loanAmount: customerData['Loan Amount'] || '',
    emi: customerData['EMI'] || '',
    loanDue: customerData['Loan Due'] || '',
    minAmount: customerData['Min Amount'] || '',
    branchName: customerData['Branch Name'] || '', //✅ Optional
    billDate: customerData['Bill Date'] || '',
    dueDate: customerData['Due Date'] || '', //✅ Optional
    billUpdateOn: customerData['Bill Update On'] || '',
    billPeriod: customerData['Bill Period'] || '', //✅ Optional
    billerId: billerId,
    billNumber: customerData['Bill Number'] || '', //✅ Optional
  };
};