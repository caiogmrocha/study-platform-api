import { RequiredFieldError } from '../errors/required-field-error';
import { IValidator } from '../i-validator';

export class RequiredFieldValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly field: unknown
  ) {}

  validate (): RequiredFieldError | void {
    if (this.field === null || this.field === undefined || this.field === '') {
      return new RequiredFieldError(this.fieldName);
    }
  }
}
