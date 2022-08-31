import { IController } from "@/core/http/i-controller";
import { AuthenticateStudentUseCase } from '@/modules/students/authenticate-student/authenticate-student-use-case'
import { AuthenticateStudentController } from '@/modules/students/authenticate-student/authenticate-student-controller'

export const makeAuthenticateStudentController = () : IController => {
  const authenticateStudentUseCase = new AuthenticateStudentUseCase()
  const authenticateStudentController = new AuthenticateStudentController(authenticateStudentUseCase)

  return authenticateStudentController
}
