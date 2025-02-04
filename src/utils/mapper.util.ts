import { CreateBillerDto } from '../biller/dto/createBiller.dto';

/**
 * Maps alternative fields to `uniqueBillerIdentifier` for consistent handling.
 * @param dto Input DTO that may contain alternative identifiers.
 * @returns A `CreateBillerDto` with `uniqueBillerIdentifier` set.
 * @throws If no valid identifier is found.
 */
export function mapToUniqueBillerIdentifier(dto: any): CreateBillerDto {
  const uniqueBillerIdentifier =
    dto.uniqueBillerIdentifier || dto.loanAccountNumber || dto.billerNumber || dto.refIdNumber;

  if (!uniqueBillerIdentifier) {
    throw new Error('uniqueBillerIdentifier or equivalent field is required.');
  }

  return {
    ...dto,
    uniqueBillerIdentifier,
    loanAccountNumber: undefined,
    billerNumber: undefined,
    refIdNumber: undefined,
  };
}
