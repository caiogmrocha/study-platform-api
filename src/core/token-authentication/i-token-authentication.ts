export interface ITokenAuthentication {
  /**
   * Gera um token de acesso que pode ser usado para
   * autorizar o acesso à API. Além disso, podem e
   * devem ser fornecidos dados que identifiquem cada
   * token de autenticação de forma individual, como,
   * por exemplo, o id do usuário ou o seu e-mail.
   *
   * @param params - dados individuais que serão criptografados.
   * @param expiresIn - tempo de validade do token que será gerado.
   * @returns - token gerado.
   */
  sign(params: any, expiresIn: number): Promise<string>;

  /**
   * Verifica se o token de acesso provido é válido e,
   * se válido, descriptografa o token e devolve os
   * dados que foram enviados.
   *
   * @param accessToken - token de autenticação.
   * @returns - dados descriptografados.
   */
  verify(accessToken: string): Promise<any>;
}
