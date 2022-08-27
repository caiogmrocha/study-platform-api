import { ValidationError } from '@/validations/errors/validation-error';
import { Either } from '../logic/Either';
import { HttpResponse } from './i-http-response';

export interface IController<T = any> {
  handle(request: T): Promise<HttpResponse>;
  validate?(request: T): Promise<Either<ValidationError, null>>;
}
