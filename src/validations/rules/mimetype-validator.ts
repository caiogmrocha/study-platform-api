import { File, IMimeTypes } from '@/core/file-system/file';
import { MimeTypeError } from '../errors/mimetype-error';
import { IValidator } from '../i-validator';

export class MimeTypeValidator implements IValidator {
  private mimetypes: Array<IMimeTypes> = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/x-icon',
  ]

  constructor (
    public readonly fieldName: string,
    public readonly field: unknown,
    public readonly acceptedMimetypes: Array<IMimeTypes>
  ) {}

  validate (): MimeTypeError | void {
    if (!this.field) {
      return new MimeTypeError(this.fieldName, this.acceptedMimetypes);
    }

    if (this.field instanceof File) {
      if (!this.acceptedMimetypes.includes(this.field.mimeType as IMimeTypes)) {
        return new MimeTypeError(this.fieldName, this.acceptedMimetypes)
      }
    }
  }
}
