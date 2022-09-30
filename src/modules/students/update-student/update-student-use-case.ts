import { Either, left, right } from '@/core/logic/Either';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

export interface IUpdateStudentDTO {
  authenticatedStudentId: string;
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
}

export class UpdateStudentUseCase {
  constructor (
    private readonly studentsRepository: IStudentsRepository
  ) {}

  async execute({ id, authenticatedStudentId, ...data }: IUpdateStudentDTO): Promise<Either<Error, null>> {
    const studentFoundedById = await this.studentsRepository.findById(id)

    if (!studentFoundedById) {
      return left(new StudentDoesNotExistsError(id, 'id'))
    }

    return right(null)
  }
}
