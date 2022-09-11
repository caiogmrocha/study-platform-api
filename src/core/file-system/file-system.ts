import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { promisify } from 'util';
import { IFileSystemConfig } from "./config/i-file-system-config";
import { IFileSystem } from './i-file-system';

const existsAsync = promisify(existsSync)

export class FileSystem implements IFileSystem {
  constructor (
    private readonly config: IFileSystemConfig
  ) {}

  async store(file: Buffer, fileName: string): Promise<string> {
    await writeFile(`${this.config.path}/${fileName}`, file)

    return `${this.config.path}/${fileName}`
  }

  async checkIfExists(fileName: string): Promise<boolean> {
    const result = await existsAsync(`${this.config.path}/${fileName}`)

    return !!result
  }
}
