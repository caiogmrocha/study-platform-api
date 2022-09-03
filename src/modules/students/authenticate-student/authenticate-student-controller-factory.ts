import { BcryptEncryptionAdapter } from "@/core/encryption/bcrypt-encryption-adapter";
import { IController } from "@/core/http/i-controller";
import { JwtTokenAuthenticationAdapter } from "@/core/token-authentication/jwt-token-authentication-adapter";
import { AuthenticateStudentController } from '@/modules/students/authenticate-student/authenticate-student-controller';
import { AuthenticateStudentUseCase } from '@/modules/students/authenticate-student/authenticate-student-use-case';
import { PrismaStudentsRepository } from "@/repositories/prisma-students-repository";
import dotenv from 'dotenv';

dotenv.config()

export const makeAuthenticateStudentController = () : IController => {
  const encription = new BcryptEncryptionAdapter(10)
  const tokenAuthentication = new JwtTokenAuthenticationAdapter(process.env.JWT_SECRET || '')
  const studentRepository = new PrismaStudentsRepository()
  const authenticateStudentUseCase = new AuthenticateStudentUseCase(studentRepository, tokenAuthentication, encription)
  const authenticateStudentController = new AuthenticateStudentController(authenticateStudentUseCase)

  return authenticateStudentController
}
