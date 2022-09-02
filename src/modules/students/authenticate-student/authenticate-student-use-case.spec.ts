import { FakeEncryption } from '@/core/encryption/fake-encription';
import { IEncryption } from '@/core/encryption/i-encryption';
import { FakeTokenAuthentication } from '@/core/token-authentication/fake-token-authentication';
import { ITokenAuthentication } from '@/core/token-authentication/i-token-authentication';
import { Student } from '@/entities/student';
import { AuthenticateStudentUseCase } from '@/modules/students/authenticate-student/authenticate-student-use-case';
import { InMemoryStudentsRepository } from '@/repositories/in-memory-students-repository';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

type SutTypes = {
  tokenAuthentication: ITokenAuthentication,
  encription: IEncryption,
  sut: AuthenticateStudentUseCase
}

var encription;

const makeSut = (students: Student[]): SutTypes => {
  const studentRepository = new InMemoryStudentsRepository(students)
  const tokenAuthentication = new FakeTokenAuthentication()
  const encription = new FakeEncryption()
  const sut = new AuthenticateStudentUseCase(studentRepository, tokenAuthentication, encription)

  return {
    tokenAuthentication,
    encription,
    sut
  }
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

  it('should return student data and JWT token if has been authenticated', async () => {
    const { sut } = makeSut([
      new Student({
        name: 'any_name',
        email: 'any@email.com',
        password: await (new FakeEncryption()).hash('any_password'),
        phone: '00000000000',
        image: 'path/to/image',
        bio: 'any_bio'
      })
    ])

    const resultOrError = await sut.execute({
      email: 'any@email.com',
      password: 'any_password',
    })

    expect(resultOrError.isRight()).toBeTruthy()
    expect(resultOrError.value).toEqual({
      student: new Student({
        id: expect.any(String),
        name: 'any_name',
        email: 'any@email.com',
        password: expect.any(String),
        phone: '00000000000',
        image: 'path/to/image',
        bio: 'any_bio'
      }),
      token: expect.any(String)
    })
  })
})
