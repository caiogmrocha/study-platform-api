import { ValidationError } from '@/validations/errors/validation-error';
import { Either } from '../logic/Either';
import { HttpResponse } from './i-http-response';

export interface IController<T = any> {
  /**
   * Manipula e adapta a requisição HTTP para
   * o uso interno e devolve uma resposta HTTP.
   *
   * @param request - dados da requisição HTTP.
   * @returns - resposta HTTP.
   */
  handle(request: T): Promise<HttpResponse>;

  /**
   * Valida os dados que foram enviados na requisição
   * para garantir a execução correta dos processos
   * internos.
   *
   * @param request - dados da requisição HTTP.
   * @returns - erros de validação ou, caso seja um sucesso, nulo.
   */
  validate?(request: T): Promise<Either<ValidationError, null>>;
}
