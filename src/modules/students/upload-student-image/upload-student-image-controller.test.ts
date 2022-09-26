import { app } from '@/app'
import { BcryptEncryptionAdapter } from '@/core/encryption/bcrypt-encryption-adapter'
import { PrismaStudentsRepository } from '@/repositories/prisma-students-repository'
import { ValidationError } from '@/validations/errors/validation-error'
import request from 'supertest'
import { RegisterStudentUseCase } from '../register-student/register-student-use-case'

let studentId: string;

describe('[e2e] UploadStudentImageController', () => {
  beforeEach(async () => {
    const prismaStudentsRepository = new PrismaStudentsRepository()
    const encription = new BcryptEncryptionAdapter(10)
    const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, encription)

    const student = await registerStudentUseCase.execute({
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    })

    studentId = (student.isRight() && student.value.id) as string
  })

  it('should return 422 if the provided file not is in accepted mimetypes', async () => {
    const response = await request(app).post(`/students/upload-image/${studentId}`).attach('image', Buffer.from('any_thing'))

    expect(response.status).toBe(422)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ValidationError.name
      })
    }))
  })
})
