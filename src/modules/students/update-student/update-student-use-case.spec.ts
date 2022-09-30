import { AccessDeniedError } from '@/core/http/errors/access-denied-error';
import { Student } from '@/entities/student';
import { UpdateStudentUseCase } from '@/modules/students/update-student/update-student-use-case';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { InMemoryStudentsRepository } from '@/repositories/in-memory-students-repository';
import { randomUUID } from 'crypto';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

type SutTypes = {
  sut: UpdateStudentUseCase;
  studentsRepository: IStudentsRepository;
}

const makeSut = (students: Student[] = []): SutTypes => {
  const studentsRepository = new InMemoryStudentsRepository(students)
  const sut = new UpdateStudentUseCase(studentsRepository);

  return { sut, studentsRepository }
}

describe('Update Student', () => {
  it('should return StudentDoesNotExistsError if student does not exists', async () => {
    const student = new Student({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'any_password',
      phone: '00000000000',
      bio: 'any_bio_here',
      image: '',
    })
    const randomStudentId = randomUUID()
    const { sut } = makeSut([ student ])

    const resultOrError = await sut.execute({
      authenticatedStudentId: student.id as string,
      id: randomStudentId,
      name: 'John Three',
      email: 'john@three.com',
      password: 'any_password',
      phone: '11111111111',
      bio: 'any_bio_here'
    })

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(resultOrError.value).toEqual(new StudentDoesNotExistsError(randomStudentId, 'id'))
  })

  it('should return AccessDeniedError if student does not is authenticated', async () => {
    const students = [
      new Student({
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'any_password',
        phone: '00000000000',
        bio: 'any_bio_here',
        image: '',
      }),
      new Student({
        name: 'John Three',
        email: 'john@three.com',
        password: 'any_password',
        phone: '11111111111',
        bio: 'any_bio_here',
        image: '',
      }),
    ]
    const { sut } = makeSut(students)

    const resultOrError = await sut.execute({
      authenticatedStudentId: students[0].id as string,
      id: students[1].id as string,
      name: 'John Three',
      email: 'john@three.com',
      password: 'any_password',
      phone: '11111111111',
      bio: 'any_bio_here'
    })

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(resultOrError.value).toEqual(new AccessDeniedError())
  })
})
