import { Either, left, right } from "@/core/logic/Either";
import { Student } from "@/entities/student";
import { IStudentsRepository } from "@/repositories/i-students-repository";
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";

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
    const studentOrError = await this.studentRepository.findByEmail(data.email)

    if (studentOrError) {
      return left(new StudentAlreadyExistsError(data.email))
    }

    const student = new Student({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      image: data.image,
      bio: data.bio
    })

    return right(student)
  }
}
