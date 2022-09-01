import { Student } from '@/entities/student';
import { AuthenticateStudentUseCase } from '@/modules/students/authenticate-student/authenticate-student-use-case';
import { InMemoryStudentsRepository } from '@/repositories/in-memory-students-repository';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

type SutTypes = {
  sut: AuthenticateStudentUseCase
}

const makeSut = (students: Student[]): SutTypes => {
  const studentRepository = new InMemoryStudentsRepository(students)
  const sut = new AuthenticateStudentUseCase(studentRepository);

  return { sut }
}

describe('Authenticate Student', () => {
  it('should return StudentDoesNotExistsError if Student does not exists', async () => {
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

    const resultOrError = await sut.execute({
      email: 'other@email.com',
      password: 'other_password',
    })

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(resultOrError.value).toEqual(new StudentDoesNotExistsError('other@email.com', 'e-mail'))
  })

  it('should return InvalidCrendentialsError if the provided password is invalid', async () => {
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

    const resultOrError = await sut.execute({
      email: 'any@email.com',
      password: 'other_password',
    })

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(resultOrError.value).toEqual(new InvalidCrendentialsError())
  })
})
