export interface IFileSystem {
  store(file: Buffer, fileName: string): Promise<string>;
  checkIfExists(fileName: string): Promise<boolean>;
}
