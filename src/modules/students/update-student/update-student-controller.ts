import { AccessDeniedError } from "@/core/http/errors/access-denied-error";
import { IController } from "@/core/http/i-controller";
import { clientError, created, HttpResponse, unauthorized } from "@/core/http/i-http-response";
import { UpdateStudentUseCase } from '@/modules/students/update-student/update-student-use-case';

export interface UpdateStudentControllerRequest {
  studentId: string;
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
}

export class UpdateStudentController implements IController<UpdateStudentControllerRequest> {
  constructor (
    private readonly updateStudentUseCase: UpdateStudentUseCase,
  ) {}

  async handle(request: UpdateStudentControllerRequest): Promise<HttpResponse> {
    const resultOrError = await this.updateStudentUseCase.execute({
      authenticatedStudentId: request.studentId,
      ...request,
    });

    if (resultOrError.isLeft()) {
      const error = resultOrError.value

      switch (error.constructor) {
        case AccessDeniedError:
          return unauthorized(error);

        default:
          return clientError(error)
      }
    }

    return created()
  }
}
