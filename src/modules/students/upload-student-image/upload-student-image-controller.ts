import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case'
import { created, clientError, HttpResponse } from "@/core/http/i-http-response";
import { IController } from "@/core/http/i-controller";

export interface UploadStudentImageControllerRequest {}

export class UploadStudentImageController implements IController<UploadStudentImageControllerRequest> {
  constructor (
    private readonly uploadStudentImageUseCase: UploadStudentImageUseCase,
  ) {}

  async handle(request: UploadStudentImageControllerRequest): Promise<HttpResponse> {
    const resultOrError = await this.uploadStudentImageUseCase.execute({})

    if (resultOrError.isLeft()) {
      const error = resultOrError.value

      return clientError(error)
    }

    return created()
  }
}
