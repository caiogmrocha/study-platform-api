import { File } from "@/core/file-system/file";
import { IController } from "@/core/http/i-controller";
import { clientError, created, HttpResponse, notFound, unprocessable } from "@/core/http/i-http-response";
import { Either, left, right } from '@/core/logic/Either';
import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case';
import { ValidationError } from '@/validations/errors/validation-error';
import { MimeTypeValidator } from "@/validations/rules/mimetype-validator";
import { RequiredFieldValidator } from "@/validations/rules/required-field-validator";
import { ValidationCompositor } from "@/validations/validation-compositor";
import { StudentDoesNotExistsError } from "../errors/student-does-not-exists-error";

export interface UploadStudentImageControllerRequest {
  id: string;
  files: {
    image: File
  };
}

export class UploadStudentImageController implements IController<UploadStudentImageControllerRequest> {
  constructor (
    private readonly uploadStudentImageUseCase: UploadStudentImageUseCase,
  ) {}

  async handle(request: UploadStudentImageControllerRequest): Promise<HttpResponse> {
    const { id, files: { image } } = request

    const validationResult = await this.validate(request)

    if (validationResult.isLeft()) {
      return unprocessable(validationResult.value)
    }

    const resultOrError = await this.uploadStudentImageUseCase.execute({
      image,
      id
    })

    if (resultOrError.isLeft()) {
      const error = resultOrError.value

      switch (error.constructor) {
        case StudentDoesNotExistsError:
          return notFound(error)

        default:
          return clientError(error)
      }
    }

    return created()
  }

  async validate(request: UploadStudentImageControllerRequest): Promise<Either<ValidationError, null>> {
    const { id, files: { image } } = request;

    const validationCompositor = new ValidationCompositor([
      new RequiredFieldValidator('id', id),
      new RequiredFieldValidator('image', image),
      new MimeTypeValidator('image', image, [
        'image/jpeg',
        'image/png'
      ])
    ])

    const resultOrError = validationCompositor.validate();

    if (Object.keys(resultOrError.errors).length === 0) {
      return right(null)
    }

    return left(resultOrError)
  }
}
