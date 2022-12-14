import { IEncryption } from '@/core/encryption/i-encryption';
import { Either, left, right } from '@/core/logic/Either';
import { ITokenAuthentication } from '@/core/token-authentication/i-token-authentication';
import { Student } from '@/entities/student';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

export interface IAuthenticateStudentDTO {
  email: string;
  password: string;
}

export interface IAuthenticateStudentResult {
  student: Student,
  token: string,
}

export class AuthenticateStudentUseCase {
  constructor (
    private readonly studentRepository: IStudentsRepository,
    private readonly tokenAuthentication: ITokenAuthentication,
    private readonly encription: IEncryption
  ) {}

  async execute({ email, password }: IAuthenticateStudentDTO): Promise<Either<
    StudentDoesNotExistsError | InvalidCrendentialsError,
    IAuthenticateStudentResult
  >> {
    const studentFoundedByEmail = await this.studentRepository.findByEmail(email)

    if (!studentFoundedByEmail) {
      return left(new StudentDoesNotExistsError(email, 'e-mail'))
    }

    const passwordIsValid = await this.encription.compare(password, studentFoundedByEmail.password)

    if (!passwordIsValid) {
      return left(new InvalidCrendentialsError())
    }

    const token = await this.tokenAuthentication.sign({ studentId: studentFoundedByEmail.id }, 86400)

    return right({
      student: studentFoundedByEmail,
      token
    });
  }
}
