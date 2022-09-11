import { access, readFile, unlink, writeFile } from 'fs/promises';
import { IFileSystemConfig } from "./config/i-file-system-config";
import { IFileSystem } from './i-file-system';

export class FileSystem implements IFileSystem {
  constructor (
    private readonly config: IFileSystemConfig
  ) {}

  async store(file: Buffer, fileName: string): Promise<string> {
    await writeFile(`${this.config.path}/${fileName}`, file)

    return `${this.config.path}/${fileName}`
  }

  async delete(fileName: string): Promise<boolean> {
    if (await this.checkIfExists(fileName)) {
      await unlink(fileName)

      return true
    } else {
      return false
    }
  }

  async checkIfExists(fileName: string): Promise<boolean> {
    try {
      await access(`${this.config.path}/${fileName}`)

      return true
    } catch (error) {
      return false
    }
  }

  async getFile(fileName: string): Promise<Buffer> {
    const file = await readFile(`${this.config.path}/${fileName}`)

    return file
  }
}
