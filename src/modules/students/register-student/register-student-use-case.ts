import { IEncryption } from "@/core/encryption/i-encryption";
import { Either, left, right } from "@/core/logic/Either";
import { Student } from "@/entities/student";
import { IStudentsRepository } from "@/repositories/i-students-repository";
import { StudentAlreadyExistsError } from "../errors/student-already-exists-error";

export interface IRegisterStudentDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
}

export class RegisterStudentUseCase {
  constructor (
    private readonly studentRepository: IStudentsRepository,
    private readonly encription: IEncryption
  ) {}

  async execute(data: IRegisterStudentDTO): Promise<Either<StudentAlreadyExistsError, Student>> {
    const studentFoundedByEmail = await this.studentRepository.findByEmail(data.email)

    if (studentFoundedByEmail) {
      return left(new StudentAlreadyExistsError(data.email, 'e-mail'))
    }

    const studentFoundedByPhone = await this.studentRepository.findByPhone(data.phone)

    if (studentFoundedByPhone) {
      return left(new StudentAlreadyExistsError(data.phone, 'telefone'))
    }

    const hashedPassword = await this.encription.hash(data.password)

    await this.studentRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      bio: data.bio,
      image: null
    })

    const student = new Student({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      bio: data.bio,
      image: null
    })

    return right(student)
  }
}
