import { IMimeTypes } from "@/core/file-system/file";


export class MimeTypeError extends Error {
  constructor (fieldName: string, acceptedMimetypes?: Array<IMimeTypes>) {
    if (acceptedMimetypes) {
      super(`O campo ${fieldName} precisa estar entre os tipos: ${acceptedMimetypes.join(', ')}.`);
    } else {
      super(`O campo ${fieldName} precisa ser um arquivo.`)
    }

    this.name = 'MimetypeError';
  }
}
