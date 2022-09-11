export interface IFileSystem {
  store(file: Buffer, fileName: string): Promise<string>;
  delete(fileName: string): Promise<boolean>;
  checkIfExists(fileName: string): Promise<boolean>;
  getFile(fileName: string): Promise<Buffer>;
}
