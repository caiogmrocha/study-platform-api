import { localDiskFileSystemConfig } from '@/core/file-system/config/local-disk-file-system-config';
import { File } from '@/core/file-system/file';
import { FileSystem } from '@/core/file-system/file-system';
import { IFileSystem } from '@/core/file-system/i-file-system';
import { Student } from '@/entities/student';
import { UploadStudentImageUseCase } from '@/modules/students/upload-student-image/upload-student-image-use-case';
import { IStudentsRepository } from '@/repositories/i-students-repository';
import { InMemoryStudentsRepository } from '@/repositories/in-memory-students-repository';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { StudentDoesNotExistsError } from '../errors/student-does-not-exists-error';

type SutTypes = {
  sut: UploadStudentImageUseCase;
  studentRepository: IStudentsRepository;
  fileSystem: IFileSystem;
}

const makeSut = (students: Student[]): SutTypes => {
  const studentRepository = new InMemoryStudentsRepository(students);
  const fileSystem = new FileSystem(localDiskFileSystemConfig)
  const sut = new UploadStudentImageUseCase(studentRepository, fileSystem);

  return {
    sut,
    studentRepository,
    fileSystem
  }
}

const makeImageFile = () => {
  const image = new File({
    fieldName: 'image',
    mimeType: 'image/png',
    size: 1024,
    data: Buffer.from('some_thing')
  })

  return image;
}

describe('Upload Student Image', () => {
  afterAll(async () => {
    const files = await readdir(localDiskFileSystemConfig.path)

    files.forEach(async fileName => {
      await unlink(path.join(localDiskFileSystemConfig.path, fileName))
    })
  })

  it('should be able to store the image of student', async () => {
    const image = makeImageFile()
    const { sut, fileSystem, studentRepository } = makeSut([
      new Student({
        id: 'any_id',
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password',
        phone: '00000000000',
        image: null,
        bio: 'any_bio'
      })
    ])

    const resultOrError = await sut.execute({ id: 'any_id', image })
    const student = await studentRepository.findById('any_id')
    const imageExists = await fileSystem.checkIfExists(student && student.image ? student.image : 'any')

    expect(resultOrError.isRight()).toBeTruthy()
    expect(imageExists).toBeTruthy()
  })

  it('should return StudentDoesNotExistsError if student does not exists', async () => {
    const image: File = new File({
      fieldName: 'image',
      mimeType: 'image/png',
      size: 1024,
      data: Buffer.from('some_thing')
    });
    const { sut } = makeSut([
      new Student({
        id: 'any_id',
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password',
        phone: '00000000000',
        image: null,
        bio: 'any_bio'
      })
    ])

    const resultOrError = await sut.execute({ id: 'other_id', image })

    expect(resultOrError.isLeft()).toBeTruthy()
    expect(resultOrError.value).toEqual(new StudentDoesNotExistsError('other_id', 'id'))
  })
})
