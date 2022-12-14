import { Student } from "@/entities/student";
import { IStudentData, IStudentsRepository } from "./i-students-repository";

export class InMemoryStudentsRepository implements IStudentsRepository {
  constructor (
    private students: Student[] = []
  ) {}

  async findById(id: string): Promise<Student | void> {
    const student = this.students.find(student => student.id === id)

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

  async create(data: IStudentData): Promise<Student> {
    const student = new Student(data);

    this.students.push(student)

    return student
  }

  async update(data: IStudentData, id: string): Promise<Student> {
    this.students = this.students.map(student => {
      if (student.id === id) {
        student.props = Object.assign({}, student.props, data)

        return student
      }

      return student
    })

    return this.students.find(student => student.id === id) as Student
  }
}
