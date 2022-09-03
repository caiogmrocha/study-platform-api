import { BcryptEncryptionAdapter } from "@/core/encryption/bcrypt-encryption-adapter";
import { IController } from "@/core/http/i-controller";
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";
import { RegisterStudentController } from "./register-student-controller";
import { RegisterStudentUseCase } from "./register-student-use-case";

export const makeRegisterStudentController = (): IController => {
  const prismaStudentsRepository = new PrismaStudentsRepository()
  const encription = new BcryptEncryptionAdapter(10)
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, encription)
  const registerStudentController = new RegisterStudentController(registerStudentUseCase)

  return registerStudentController
}
