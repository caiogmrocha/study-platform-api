import { InvalidEmailError } from '../errors/invalid-email-error';
import { IValidator } from '../i-validator';

export class IsEmailValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly field: unknown
  ) {}

  validate (): InvalidEmailError | void {
    if (this.field && typeof this.field === 'string') {
      const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (!(regExp.test(this.field))) {
        return new InvalidEmailError(this.fieldName);
      }
    } else {
      return new InvalidEmailError(this.fieldName);
    }
  }
}
