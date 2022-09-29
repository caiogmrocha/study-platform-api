import { BcryptEncryptionAdapter } from "@/core/encryption/bcrypt-encryption-adapter";
import { JwtTokenAuthenticationAdapter } from "@/core/token-authentication/jwt-token-authentication-adapter";
import { Student } from "@/entities/student";
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";
import dotenv from 'dotenv';
import { AuthenticateStudentUseCase, IAuthenticateStudentResult } from "../authenticate-student/authenticate-student-use-case";
import { RegisterStudentUseCase } from "../register-student/register-student-use-case";

dotenv.config({ path: '.env.test' });

export const makeStudentAndAuthenticate = async (): Promise<IAuthenticateStudentResult> => {
  const studentRepository = new PrismaStudentsRepository()
  const encription = new BcryptEncryptionAdapter(10)
  const registerStudentUseCase = new RegisterStudentUseCase(studentRepository, encription)
  const tokenAuthentication = new JwtTokenAuthenticationAdapter(process.env.JWT_SECRET || '')
  const authenticateStudentUseCase = new AuthenticateStudentUseCase(studentRepository, tokenAuthentication, encription)

  const studentOrError = await registerStudentUseCase.execute({
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'password',
    phone: '00000000000',
    bio: 'any_bio_here',
  })

  const student = studentOrError.value as Student

  const studentAndTokenOrError = await authenticateStudentUseCase.execute({
    email: student.email,
    password: 'password',
  })

  const { token } = studentAndTokenOrError.value as IAuthenticateStudentResult

  return { student, token }
}
