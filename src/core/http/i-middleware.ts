import { HttpResponse } from "./i-http-response";

export interface IMiddleware<T = any> {
  /**
   * Baseado nos dados da requisição HTTP,
   * impede ou permite que a solicitação
   * possa prosseguir.
   *
   * @param request - dados da requisição HTTP.
   */
  handle(request: T): Promise<HttpResponse>;
}
