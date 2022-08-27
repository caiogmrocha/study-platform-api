import { ErrorMessagesType } from '../validation-compositor';

export class ValidationError extends Error {
  constructor (public readonly errors: ErrorMessagesType) {
    super('Validation Error');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}
