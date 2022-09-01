import { adaptBcryptCompare } from '@/core/adapters/bcrypt/bcrypt-compare-adapter';
import { Either, left, right } from '@/core/logic/Either';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';
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

    const passwordIsValid = await adaptBcryptCompare(studentFoundedByEmail.password, password)

    if (!passwordIsValid) {
      return left(new InvalidCrendentialsError())
    }

    return right(null);
  }
}
