import { localDiskFileSystemConfig } from "@/core/file-system/config/local-disk-file-system-config";
import { FileSystem } from "@/core/file-system/file-system";
import { IController } from "@/core/http/i-controller";
import { UploadStudentImageController } from '@/modules/students/upload-student-image/upload-student-image-controller';
import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case';
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";

export const makeUploadStudentImageController = () : IController => {
  const prismaStudentRepository = new PrismaStudentsRepository()
  const fileSystem = new FileSystem(localDiskFileSystemConfig)
  const uploadStudentImageUseCase = new UploadStudentImageUseCase(prismaStudentRepository, fileSystem)
  const uploadStudentImageController = new UploadStudentImageController(uploadStudentImageUseCase)

  return uploadStudentImageController
}
