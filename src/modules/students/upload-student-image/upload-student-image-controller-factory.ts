import { IController } from "@/core/http/i-controller";
import { UploadStudentImageController } from '@/modules/students/upload-student-image/upload-student-image-controller';
import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case';
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";

export const makeUploadStudentImageController = () : IController => {
  const prismaStudentRepository = new PrismaStudentsRepository()
  const uploadStudentImageUseCase = new UploadStudentImageUseCase(prismaStudentRepository)
  const uploadStudentImageController = new UploadStudentImageController(uploadStudentImageUseCase)

  return uploadStudentImageController
}
