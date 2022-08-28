import { Student } from "@/entities/student";
import { IStudentData, IStudentsRepository } from "./i-students-repository";

export class InMemoryStudentsRepository implements IStudentsRepository {
  constructor (
    private students: Student[] = []
  ) {}

  async findByEmail(email: string): Promise<Student | void> {
    const student = this.students.find(student => student.email === email)

    if (student) {
      return new Student({
        id: student.id,
        name: student.name,
        email: student.email,
        password: student.password,
        phone: student.phone,
        image: student.image,
        bio: student.bio,
      })
    }
  }

  async findByPhone(phone: string): Promise<Student | void> {
    const student = this.students.find(student => student.phone === phone)

    if (student) {
      return new Student({
        id: student.id,
        name: student.name,
        email: student.email,
        password: student.password,
        phone: student.phone,
        image: student.image,
        bio: student.bio,
      })
    }
  }

  async create(data: IStudentData): Promise<void> {
    this.students.push(new Student(data))
  }
}
