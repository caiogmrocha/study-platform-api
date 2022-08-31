import { AuthenticateStudentUseCase } from '@/modules/students/authenticate-student/authenticate-student-use-case'
import { created, clientError, HttpResponse } from "@/core/http/i-http-response";
import { IController } from "@/core/http/i-controller";

export interface AuthenticateStudentControllerRequest {}

export class AuthenticateStudentController implements IController<AuthenticateStudentControllerRequest> {
  constructor (
    private readonly authenticateStudentUseCase: AuthenticateStudentUseCase,
  ) {}

  async handle(request: AuthenticateStudentControllerRequest): Promise<HttpResponse> {
    const resultOrError = await this.authenticateStudentUseCase.execute({})

    if (resultOrError.isLeft()) {
      const error = resultOrError.value

      return clientError(error)
    }

    return created()
  }
}
