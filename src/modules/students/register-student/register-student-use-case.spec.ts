import { Student } from "@/entities/student"
import { IStudentsRepository } from "@/repositories/i-students-repository"
import { InMemoryStudentsRepository } from "@/repositories/in-memory-students-repository"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"
import { IRegisterStudentDTO, RegisterStudentUseCase } from "./register-student-use-case"

type SutTypes = {
  studentsRepository: IStudentsRepository,
  sut: RegisterStudentUseCase
}

const makeSut = (students: Student[]): SutTypes => {
  const studentsRepository = new InMemoryStudentsRepository(students)
  const sut = new RegisterStudentUseCase(studentsRepository)

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
      image: 'path/to/image',
      bio: 'any_bio'
    }

    const studentOrError = await sut.execute(data)

    expect(studentOrError.isRight()).toBeTruthy()
    expect(studentOrError.value).toEqual(new Student({
      id: expect.any(String),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      image: data.image,
      bio: data.bio
    }))
  })

  it('should return StudentAlreadyExistsError if the email already is exists', async () => {
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
      phone: '00000000000',
      image: 'path/to/image',
      bio: 'any_bio'
    }

    const studentOrError = await sut.execute(data)

    expect(studentOrError.isLeft()).toBeTruthy()
    expect(studentOrError.value).toEqual(new StudentAlreadyExistsError('any@email.com', 'e-mail'))
  })
})
