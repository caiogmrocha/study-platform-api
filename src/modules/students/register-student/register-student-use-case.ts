import { adaptBcryptHash } from "@/core/adapters/bcrypt/bcrypt-hash-adapter";
import { Either, left, right } from "@/core/logic/Either";
import { Student } from "@/entities/student";
import { IStudentsRepository } from "@/repositories/i-students-repository";
import { StudentAlreadyExistsError } from "../errors/student-already-exists-error";

export interface IRegisterStudentDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  bio: string;
}

export class RegisterStudentUseCase {
  constructor (
    private studentRepository: IStudentsRepository
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

    const hashedPassword = await adaptBcryptHash(data.password, 10)

    await this.studentRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      image: data.image,
      bio: data.bio
    })

    const student = new Student({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      image: data.image,
      bio: data.bio
    })

    return right(student)
  }
}
