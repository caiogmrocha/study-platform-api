import { app } from '@/app'
import { BcryptEncryptionAdapter } from '@/core/encryption/bcrypt-encryption-adapter'
import { localDiskFileSystemConfig } from '@/core/file-system/config/local-disk-file-system-config'
import { PrismaStudentsRepository } from '@/repositories/prisma-students-repository'
import { ValidationError } from '@/validations/errors/validation-error'
import { readdir, unlink } from 'fs/promises'
import path from 'path'
import request from 'supertest'
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error'
import { RegisterStudentUseCase } from '../register-student/register-student-use-case'

const makeRegisterStudentUseCase = () => {
  const prismaStudentsRepository = new PrismaStudentsRepository()
  const encription = new BcryptEncryptionAdapter(10)
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, encription)

  return {
    prismaStudentsRepository,
    encription,
    registerStudentUseCase
  }
}

describe('[e2e] UploadStudentImageController', () => {
  afterAll(async () => {
    const files = await readdir(localDiskFileSystemConfig.path)

    files.forEach(async fileName => {
      await unlink(path.join(localDiskFileSystemConfig.path, fileName))
    })
  })

  it('should return 200 if image has been storaged', async () => {
    const { registerStudentUseCase, prismaStudentsRepository } = makeRegisterStudentUseCase()
    const student = await registerStudentUseCase.execute({
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    })
    const studentId = (student.isRight() && student.value.id) as string

    const response = await request(app)
      .post(`/students/upload-image/${studentId}`)
      .attach('image', Buffer.from('any_thing'), {
        filename: 'any_file.png'
      });

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      image: expect.any(String)
    })
  })

  it('should return 404 if student does not exists', async () => {
    const response = await request(app)
      .post(`/students/upload-image/any_id`)
      .attach('image', Buffer.from('any_thing'), {
        filename: 'any_file.png'
      });


    expect(response.status).toBe(404)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: StudentDoesNotExistsError.name
      })
    }))
  })

  it('should return 422 if provided file not is in accepted mimetypes', async () => {
    const { registerStudentUseCase } = makeRegisterStudentUseCase()
    const student = await registerStudentUseCase.execute({
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    })
    const studentId = (student.isRight() && student.value.id) as string

    const response = await request(app)
      .post(`/students/upload-image/${studentId}`)
      .attach('image', Buffer.from('any_thing'), {
        filename: 'any_file.pdf'
      })

    expect(response.status).toBe(422)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ValidationError.name
      })
    }))
  })
})
