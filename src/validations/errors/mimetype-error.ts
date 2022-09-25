import { IMimeTypes } from "@/core/file-system/file";


export class MimeTypeError extends Error {
  constructor (fieldName: string, acceptedMimetypes: Array<IMimeTypes>) {
    super(`O arquivo ${fieldName} precisa estar entre os tipos: ${acceptedMimetypes.join(', ')}.`);
    this.name = 'MimetypeError';
  }
}
