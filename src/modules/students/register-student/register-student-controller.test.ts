import { app } from '@/app'
import { PrismaStudentsRepository } from '@/repositories/prisma-students-repository'
import { ValidationError } from '@/validations/errors/validation-error'
import request from 'supertest'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { RegisterStudentUseCase } from './register-student-use-case'

const makeRegisterStudentUseCase = (): RegisterStudentUseCase => {
  const prismaStudentsRepository = new PrismaStudentsRepository()
  const registerStudentUseCase = new RegisterStudentUseCase(prismaStudentsRepository)

  return registerStudentUseCase
}

describe('[e2e] Register Student Controller', () => {
  it('should return 422 if invalid data is provided', async () => {
    const response = await request(app).post('/students/register').send({
      name: '', // missing name param
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      image: 'path/to/image',
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
      image: 'path/to/image',
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
