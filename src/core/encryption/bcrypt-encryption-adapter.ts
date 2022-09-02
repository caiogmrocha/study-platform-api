import bcrypt from 'bcrypt';
import { IEncryption } from "./i-encryption";

export class BcryptEncryptionAdapter implements IEncryption {
  constructor (
    private readonly salt: number
  ) {}

  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, this.salt)
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash)
  }
}
