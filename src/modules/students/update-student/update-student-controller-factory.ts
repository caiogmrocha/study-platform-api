import { BcryptEncryptionAdapter } from "@/core/encryption/bcrypt-encryption-adapter";
import { IController } from "@/core/http/i-controller";
import { UpdateStudentController } from '@/modules/students/update-student/update-student-controller';
import { UpdateStudentUseCase } from '@/modules/students/update-student/update-student-use-case';
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";

export const makeUpdateStudentController = () : IController => {
  const encription = new BcryptEncryptionAdapter(10)
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const updateStudentUseCase = new UpdateStudentUseCase(prismaStudentsRepository, encription)
  const updateStudentController = new UpdateStudentController(updateStudentUseCase)

  return updateStudentController
}
