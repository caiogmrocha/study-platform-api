import { IController } from "@/core/http/i-controller";
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";
import { RegisterStudentController } from "./register-student-controller";
import { RegisterStudentUseCase } from "./register-student-use-case";

export const makeRegisterStudentController = (): IController => {
  const prismaStudentsRepository = new PrismaStudentsRepository()
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository)
  const registerStudentController = new RegisterStudentController(registerStudentUseCase)

  return registerStudentController
}
