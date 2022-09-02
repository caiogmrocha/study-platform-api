import crypto from 'crypto';
import { IEncryption } from "./i-encryption";

export class FakeEncryption implements IEncryption {
  async hash(data: string): Promise<string> {
    return crypto.createHash('md5').update(data).digest('hex')
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return crypto.createHash('md5').update(data).digest('hex') === hash
  }
}
