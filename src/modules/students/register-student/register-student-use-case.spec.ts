import { FakeEncryption } from "@/core/encryption/fake-encription"
import { Student } from "@/entities/student"
import { IStudentsRepository } from "@/repositories/i-students-repository"
import { InMemoryStudentsRepository } from "@/repositories/in-memory-students-repository"
import { StudentAlreadyExistsError } from "../errors/student-already-exists-error"
import { IRegisterStudentDTO, RegisterStudentUseCase } from "./register-student-use-case"

type SutTypes = {
  studentsRepository: IStudentsRepository,
  sut: RegisterStudentUseCase
}

const makeSut = (students: Student[]): SutTypes => {
  const studentsRepository = new InMemoryStudentsRepository(students)
  const encription = new FakeEncryption()
  const sut = new RegisterStudentUseCase(studentsRepository, encription)

  return {
    studentsRepository,
    sut
  }
}

describe('Register Student Use Case', () => {
  it('should return Student entity if student is registered', async () => {
    const { sut } = makeSut([])
    const data: IRegisterStudentDTO = {
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    }

    const studentOrError = await sut.execute(data)

    expect(studentOrError.isRight()).toBeTruthy()
    expect(studentOrError.value).toEqual(new Student({
      id: expect.any(String),
      name: data.name,
      email: data.email,
      password: expect.any(String),
      phone: data.phone,
      image: null,
      bio: data.bio
    }))
  })

  it('should return StudentAlreadyExistsError if the e-mail already is exists', async () => {
    const { sut } = makeSut([
      new Student({
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password',
        phone: '00000000000',
        image: 'path/to/image',
        bio: 'any_bio'
      })
    ])
    const data: IRegisterStudentDTO = {
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '11111111111',
      bio: 'any_bio'
    }

    const studentOrError = await sut.execute(data)

    expect(studentOrError.isLeft()).toBeTruthy()
    expect(studentOrError.value).toEqual(new StudentAlreadyExistsError('any@email.com', 'e-mail'))
  })

  it('should return StudentAlreadyExistsError if the phone already is exists', async () => {
    const { sut } = makeSut([
      new Student({
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password',
        phone: '00000000000',
        image: 'path/to/image',
        bio: 'any_bio'
      })
    ])
    const data: IRegisterStudentDTO = {
      name: 'any_name',
      email: 'other@email.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio'
    }

    const studentOrError = await sut.execute(data)

    expect(studentOrError.isLeft()).toBeTruthy()
    expect(studentOrError.value).toEqual(new StudentAlreadyExistsError('00000000000', 'telefone'))
  })
})
