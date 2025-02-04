/**
 * @file This file contains the `mapCustomerToResponse` function which maps customer data to a specific response format
 * based on the `billerId` of the customer. The function handles different formats for different biller IDs and provides
 * a default format if no specific format is available for the given biller ID.
 */

export const mapCustomerToResponse = (customer: any) => {
  // Formatting the response according to repco finance
  if (customer.billerId === 'RFPL00000NATZB') {
    return {
      'BRANCH NAME': customer.branchName || '',
      'ACCT-ID': customer.customerIdentifier || '',
      'CUSTOMER NAME': customer.customerName || '',
      'LOAN AMOUNT': customer.loanAmount || '',
      'Principle OS': customer.principleOs || '',
      'LOAN DUE': customer.loanDue || '0',
      EMI: customer.emi || '',
      'MIN AMT': customer.minAmount || '',
      'MAX AMT': customer.billAmount || '',
    };
  } else if (customer.billerId === 'AYEF00000NATZB') {
    // Formatting the response according to aye finance
    return {
      'Customer identifier 1': customer.customerIdentifier || '',
      'Biller id': customer.billerId || '',
      'Bill number': customer.billNumber || '',
      'Bill date (dd-mm-yyyy)': customer.billDate || '',
      'Due date (dd-mm-yyyy)': customer.dueDate || '',
      'Bill Amount': customer.billAmount || '',
      'Customer name': customer.customerName || '',
      'Bill info updated on (dd-mm-yyyy)': customer.billUpdatedOn || '',
      'Bill period': customer.billPeriod || '',
    };
  } else {
    return {
      'CUSTOMER NAME': customer.customerName || '',
      DATA: 'No specific format available for this biller',
    };
  }
};
