import { app } from '@/app'
import { BcryptEncryptionAdapter } from '@/core/encryption/bcrypt-encryption-adapter'
import { PrismaStudentsRepository } from '@/repositories/prisma-students-repository'
import { ValidationError } from '@/validations/errors/validation-error'
import request from 'supertest'
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error'
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error'
import { RegisterStudentUseCase } from '../register-student/register-student-use-case'

describe('[e2e] AuthenticateStudentController', () => {
  beforeEach(async () => {
    const prismaStudentsRepository = new PrismaStudentsRepository()
    const encription = new BcryptEncryptionAdapter(10)
    const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, encription)

    await registerStudentUseCase.execute({
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      image: 'path/to/image',
      bio: 'any_bio'
    })
  })

  it('should return 422 if the provided credentials are invalid', async () => {
    const requestData = {
      email: 'any@email.com',
      password: 'password'
    }

    const response = await request(app).post('/students/login').send(requestData)

    expect(response.status).toBe(422)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ValidationError.name
      })
    }))
  })

  it('should return 401 if the provided e-mail does not exists', async () => {
    const requestData = {
      email: 'john@doe.com',
      password: 'any_password'
    }

    const response = await request(app).post('/students/login').send(requestData)

    expect(response.status).toBe(401)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: StudentDoesNotExistsError.name
      })
    }))
  })

  it('should return 401 if the provided e-mail and password does not match', async () => {
    const requestData = {
      email: 'any@email.com',
      password: 'other_password'
    }

    const response = await request(app).post('/students/login').send(requestData)

    expect(response.status).toBe(401)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: InvalidCrendentialsError.name
      })
    }))
  })
})
