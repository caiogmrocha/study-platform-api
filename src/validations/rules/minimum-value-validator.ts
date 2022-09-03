import { MinimumValueError } from '../errors/minimum-value-error';
import { IValidator } from '../i-validator';

export class MinimumValueValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly field: unknown,
    public readonly minimum: number
  ) {}

  validate (): MinimumValueError | void {
    if (typeof this.field === 'string') {
      if (this.field.length < this.minimum) {
        return new MinimumValueError(this.fieldName, this.field, this.minimum)
      }
    }

    if (typeof this.field === 'number') {
      if (this.field < this.minimum) {
        return new MinimumValueError(this.fieldName, this.field, this.minimum)
      }
    }

    if (Array.isArray(this.field)) {
      if (this.field.length < this.minimum) {
        return new MinimumValueError(this.fieldName, this.field, this.minimum)
      }
    }
  }
}
