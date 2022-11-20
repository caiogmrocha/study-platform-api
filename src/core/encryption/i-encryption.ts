export interface IEncryption {
  /**
   * Criptografa um determinado dado em texto.
   *
   * @param data - dado a ser encriptado.
   * @returns - dado encriptado.
   */
  hash(data: string): Promise<string>;

  /**
   * Compara duas hashes e verifica se elas são
   * equiparáveis entre si.
   *
   * @param data - dado que se está comparando.
   * @param hash - dado a ser comparado.
   */
  compare(data: string, hash: string): Promise<boolean>;
}
