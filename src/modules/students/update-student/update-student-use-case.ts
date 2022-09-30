import { IEncryption } from '@/core/encryption/i-encryption';
import { AccessDeniedError } from '@/core/http/errors/access-denied-error';
import { Either, left, right } from '@/core/logic/Either';
import { Student } from '@/entities/student';
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
    private readonly studentsRepository: IStudentsRepository,
    private readonly encryption: IEncryption
  ) {}

  async execute({ id, authenticatedStudentId, password, ...data }: IUpdateStudentDTO): Promise<Either<Error, Student>> {
    const studentFoundedById = await this.studentsRepository.findById(id)

    if (!studentFoundedById) {
      return left(new StudentDoesNotExistsError(id, 'id'))
    }

    if (studentFoundedById.id !== authenticatedStudentId) {
      return left(new AccessDeniedError())
    }

    const hashedPassword = await this.encryption.hash(password)

    const student = await this.studentsRepository.update({
      ...data,
      password: hashedPassword,
      image: studentFoundedById.image,
    }, id)

    return right(student)
  }
}
