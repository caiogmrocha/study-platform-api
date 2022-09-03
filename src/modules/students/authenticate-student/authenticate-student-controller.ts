import { IController } from "@/core/http/i-controller";
import { clientError, created, HttpResponse, unauthorized, unprocessable } from "@/core/http/i-http-response";
import { Either, left, right } from "@/core/logic/Either";
import { AuthenticateStudentUseCase } from '@/modules/students/authenticate-student/authenticate-student-use-case';
import { ValidationError } from "@/validations/errors/validation-error";
import { IsEmailValidator } from "@/validations/rules/is-email-validator";
import { MinimumValueValidator } from "@/validations/rules/minimum-value-validator";
import { RequiredFieldValidator } from "@/validations/rules/required-field-validator";
import { ValidationCompositor } from "@/validations/validation-compositor";
import { StudentDoesNotExistsError } from "../errors/student-does-not-exists-error";

export interface AuthenticateStudentControllerRequest {
  email: string;
  password: string;
}

export class AuthenticateStudentController implements IController<AuthenticateStudentControllerRequest> {
  constructor (
    private readonly authenticateStudentUseCase: AuthenticateStudentUseCase,
  ) {}

  async handle({ email, password }: AuthenticateStudentControllerRequest): Promise<HttpResponse> {
    const validationResult = await this.validate({ email, password })

    if (validationResult.isLeft()) {
      return unprocessable(validationResult.value)
    }

    const resultOrError = await this.authenticateStudentUseCase.execute({ email, password })

    if (resultOrError.isLeft()) {
      const error = resultOrError.value

      switch (error.constructor) {
        case StudentDoesNotExistsError:
          return unauthorized(error)

        default:
          return clientError(error)
      }
    }

    return created()
  }

  async validate(request: AuthenticateStudentControllerRequest): Promise<Either<ValidationError, null>> {
    const { email, password } = request;

    const validationCompositor = new ValidationCompositor([
      new RequiredFieldValidator('email', email),
      new IsEmailValidator('email', email),

      new RequiredFieldValidator('password', password),
      new MinimumValueValidator('password', password, 12)
    ])

    const result = validationCompositor.validate()

    if (Object.keys(result.errors).length === 0) {
      return right(null)
    }

    return left(result)
  }
}
