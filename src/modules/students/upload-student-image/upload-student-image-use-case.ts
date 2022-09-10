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
    const student = await this.studentRepository.findById(id)

    if (!student) {
      return left(new StudentDoesNotExistsError(id, 'id'))
    }

    await this.studentRepository.update({
      ...student.props,
      image: imagePath,
    }, id)

    return right(null)
  }
}
