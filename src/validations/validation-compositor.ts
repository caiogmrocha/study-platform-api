import { ValidationError } from './errors/validation-error';
import { IValidator } from './i-validator';

export type ErrorMessagesType = { [key: string]: string[] };

export class ValidationCompositor {
  public errors: ErrorMessagesType = {};

  constructor (private readonly validations: IValidator[]) {}

  validate (): ValidationError {
    for (const validation of this.validations) {
      const error = validation.validate();

      if (error) {
        if (!(this.errors[validation.fieldName])) {
          this.errors[validation.fieldName] = [];
        }

        this.errors[validation.fieldName].push(error.message);
      }
    }

    return new ValidationError(this.errors);
  }
}
