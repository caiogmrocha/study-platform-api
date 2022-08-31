import { Either, left, right } from '@/core/logic/Either';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

export interface IAuthenticateStudentDTO {
  email: string;
  password: string;
}

export class AuthenticateStudentUseCase {
  constructor (
    private readonly studentRepository: IStudentsRepository
  ) {}

  async execute({ email, password }: IAuthenticateStudentDTO): Promise<Either<Error, null>> {
    const studentFoundedByEmail = await this.studentRepository.findByEmail(email)

    if (!studentFoundedByEmail) {
      return left(new StudentDoesNotExistsError(email, 'e-mail'))
    }

    return right(null);
  }
}
