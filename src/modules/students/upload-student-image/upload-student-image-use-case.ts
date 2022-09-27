import { File } from '@/core/file-system/file';
import { IFileSystem } from '@/core/file-system/i-file-system';
import { Either, left, right } from '@/core/logic/Either';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

export interface IUploadStudentImageDTO {
  id: string;
  image: File;
}

export class UploadStudentImageUseCase {
  constructor (
    private readonly studentRepository: IStudentsRepository,
    private readonly fileSystem: IFileSystem
  ) {}

  async execute({ id, image }: IUploadStudentImageDTO): Promise<Either<Error, string>> {
    const student = await this.studentRepository.findById(id)

    if (!student) {
      return left(new StudentDoesNotExistsError(id, 'id'))
    }

    const imageFileName = Date.now() + image.extension

    await this.fileSystem.store(image.data, imageFileName)
    await this.studentRepository.update({
      ...student.props,
      image: imageFileName,
    }, id)

    return right(this.fileSystem.getFilePath(imageFileName))
  }
}
