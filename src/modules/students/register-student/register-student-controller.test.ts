import { app } from '@/app'
import { FakeEncryption } from '@/core/encryption/fake-encription'
import { PrismaStudentsRepository } from '@/repositories/prisma-students-repository'
import { ValidationError } from '@/validations/errors/validation-error'
import request from 'supertest'
import { StudentAlreadyExistsError } from '../errors/student-already-exists-error'
import { RegisterStudentUseCase } from './register-student-use-case'

const makeRegisterStudentUseCase = (): RegisterStudentUseCase => {
  const prismaStudentsRepository = new PrismaStudentsRepository()
  const encription = new FakeEncryption()
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository, encription)

  return registerStudentUseCase
}

describe('[e2e] Register Student Controller', () => {
  it('should return 201 if student has been registered', async () => {
    const requestData = {
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    }

    const response = await request(app).post('/students/register').send(requestData)

    expect(response.status).toBe(201)
    expect(response.body).toBeNull()
  })

  it('should return 422 if invalid data is provided', async () => {
    const response = await request(app).post('/students/register').send({
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_passwor', // short password
      phone: '00000000000',
      bio: 'any_bio'
    })

    expect(response.status).toBe(422)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ValidationError.name
      })
    }))
  })

  it('should return 403 if the provided e-mail already exists', async () => {
    const registerStudentUseCase = makeRegisterStudentUseCase()
    const requestData = {
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    }

    await registerStudentUseCase.execute(requestData)
    const response = await request(app).post('/students/register').send(requestData)

    expect(response.status).toBe(403)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: StudentAlreadyExistsError.name
      })
    }))
  })

  it('should return 403 if the provided phone already exists', async () => {
    const registerStudentUseCase = makeRegisterStudentUseCase()
    const requestData = {
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    }

    await registerStudentUseCase.execute(requestData)
    const response = await request(app).post('/students/register').send(requestData)

    expect(response.status).toBe(403)
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: StudentAlreadyExistsError.name
      })
    }))
  })
})
