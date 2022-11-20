export interface IFileSystem {
  /**
   * Salva um arquivo.
   *
   * @param file - arquivo bruto.
   * @param fileName - nome do arquivo.
   */
  store(file: Buffer, fileName: string): Promise<string>;

  /**
   * Deleta um arquivo.
   *
   * @param fileName - nome do arquivo.
   */
  delete(fileName: string): Promise<boolean>;

  /**
   * Verifica, baseado no nome, se um arquivo existe.
   *
   * @param fileName - nome do arquivo.
   */
  checkIfExists(fileName: string): Promise<boolean>;

  /**
   * Retorna, baseado no nome, um arquivo bruto.
   *
   * @param fileName - nome do arquivo.
   */
  getFile(fileName: string): Promise<Buffer>;

  /**
   * Retorna, baseado no nome, uma URL de acesso
   * ao arquivo.
   *
   * @param fileName - nome do arquivo.
   */
  getFilePath(fileName: string): string;
}
