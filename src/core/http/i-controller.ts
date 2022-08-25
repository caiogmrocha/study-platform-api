import { HttpResponse } from './i-http-response';

export interface IController<T = any> {
  handle(request: T): Promise<HttpResponse>;
}
