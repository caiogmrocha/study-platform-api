import { File } from "@/core/file-system/file";
import { MimeTypeError } from "../errors/mimetype-error";
import { MimeTypeValidator } from "./mimetype-validator";

describe('Mimetype Validator', () => {
  it('should return MimetypeError if the provided field is not a File', () => {
    const anyField = 'it_is_not_a_file'
    const sut = new MimeTypeValidator('image', anyField, [
      'image/jpeg',
      "image/png",
      "image/svg+xml"
    ])

    const error = sut.validate()

    expect(error).toEqual(new MimeTypeError('image'))
  })

  it('should return MimetypeError if the provided file does not match with the provided mimes', () => {
    const anyField = new File({
      fieldName: 'image',
      data: Buffer.from('any_thing'),
      mimeType: 'image/x-icon',
      size: 1024
    });
    const sut = new MimeTypeValidator('image', anyField, [
      'image/jpeg',
      "image/png",
      "image/svg+xml"
    ])

    const error = sut.validate()

    expect(error).toEqual(new MimeTypeError('image', [
      'image/jpeg',
      "image/png",
      "image/svg+xml"
    ]))
  })
})
