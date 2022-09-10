import { Either, left, right } from '@/core/logic/Either';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

export interface IUploadStudentImageDTO {
  id: string;
  imagePath: string;
}

export class UploadStudentImageUseCase {
  constructor (
    private readonly studentRepository: IStudentsRepository
  ) {}

  async execute({ id, imagePath }: IUploadStudentImageDTO): Promise<Either<Error, null>> {
    const studentFoundedById = await this.studentRepository.findById(id)

    if (!studentFoundedById) {
      return left(new StudentDoesNotExistsError(id, 'id'))
    }

    return right(null)
  }
}
