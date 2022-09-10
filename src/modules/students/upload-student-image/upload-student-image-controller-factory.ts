import { IController } from "@/core/http/i-controller";
import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case'
import { UploadStudentImageController } from '@/modules/students/upload-student-image/upload-student-image-controller'

export const makeUploadStudentImageController = () : IController => {
  const uploadStudentImageUseCase = new UploadStudentImageUseCase()
  const uploadStudentImageController = new UploadStudentImageController(uploadStudentImageUseCase)

  return uploadStudentImageController
}
