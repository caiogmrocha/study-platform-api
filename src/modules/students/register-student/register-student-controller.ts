import { IController } from "@/core/http/i-controller";
import { clientError, conflict, created, HttpResponse, serverError, unprocessable } from "@/core/http/i-http-response";
import { Either, left, right } from "@/core/logic/Either";
import { ValidationError } from "@/validations/errors/validation-error";
import { RequiredFieldValidator } from "@/validations/rules/required-field-validator";
import { ValidationCompositor } from "@/validations/validation-compositor";
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";
import { RegisterStudentUseCase } from "./register-student-use-case";

export interface RegisterStudentControllerRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  bio: string;
}

export class RegisterStudentController implements IController<RegisterStudentControllerRequest> {
  constructor (
    private readonly registerStudentUseCase: RegisterStudentUseCase
  ) {}

  async handle(request: RegisterStudentControllerRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validate(request)

      if (validationResult.isLeft()) {
        return unprocessable(validationResult.value)
      }

      const studentOrError = await this.registerStudentUseCase.execute(request)

      if (studentOrError.isLeft()) {
        const error = studentOrError.value

        switch (error.constructor) {
          case StudentAlreadyExistsError:
            return conflict(error)

          default:
            return clientError(error);
        }
      }

      return created()
    } catch (error: any) {
      return serverError(error)
    }
  }

  async validate(request: RegisterStudentControllerRequest): Promise<Either<ValidationError, null>> {
    const { name, email, password, phone, image, bio } = request

    const validationCompositor = new ValidationCompositor([
      new RequiredFieldValidator('name', name),
      new RequiredFieldValidator('email', email),
      new RequiredFieldValidator('password', password),
      new RequiredFieldValidator('phone', phone),
      new RequiredFieldValidator('image', image),
      new RequiredFieldValidator('bio', bio),
    ])

    const result = validationCompositor.validate()

    if (Object.keys(result.errors).length === 0) {
      return right(null)
    }

    return left(result)
  }
}
