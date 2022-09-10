import { Student } from '@/entities/student';
import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { InMemoryStudentsRepository } from '@/repositories/in-memory-students-repository';
import { randomUUID } from 'crypto';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

type SutTypes = {
  sut: UploadStudentImageUseCase;
  studentRepository: IStudentsRepository
}

const makeSut = (students: Student[]): SutTypes => {
  const studentRepository = new InMemoryStudentsRepository(students);
  const sut = new UploadStudentImageUseCase(studentRepository);

  return {
    sut,
    studentRepository
  }
}

describe('Upload Student Image', () => {
  it('should be able to save the image path of student', async () => {
    const imagePath = 'path/to/image';
    const { sut } = makeSut([
      new Student({
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password',
        phone: '00000000000',
        image: null,
        bio: 'any_bio'
      })
    ])

    const resultOrError = await sut.execute({ id: 'any_id', imagePath })

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(resultOrError.value).toEqual(new StudentDoesNotExistsError('any_id', 'id'))
  })

  it('should be able to save the image path of student', async () => {
    const id = randomUUID()
    const imagePath = 'path/to/image';
    const { sut, studentRepository } = makeSut([
      new Student({
        id,
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password',
        phone: '00000000000',
        image: null,
        bio: 'any_bio'
      })
    ])

    const resultOrError = await sut.execute({ id, imagePath })
    const student = await studentRepository.findById(id)

    expect(resultOrError.isRight()).toBeTruthy()
    expect(student).toEqual(new Student({
      id,
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      image: imagePath,
      bio: 'any_bio'
    }))
  })
})
