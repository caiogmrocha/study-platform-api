import { HttpResponse } from "./i-http-response";

export interface IMiddleware<T = any> {
  handle(request: T): Promise<HttpResponse>;
}
