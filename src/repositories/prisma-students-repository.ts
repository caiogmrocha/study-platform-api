import { Student } from "@/entities/student";
import { IStudentData, IStudentsRepository } from "./i-students-repository";
import { prisma } from "./prisma";

export class PrismaStudentsRepository implements IStudentsRepository {
  async findById(id: string): Promise<Student | void> {
    const student = await prisma.student.findUnique({ where: { id } })

    if (student) {
      return new Student(student)
    }
  }

  async findByEmail(email: string): Promise<Student | void> {
    const student = await prisma.student.findFirst({ where: { email } })

    if (student) {
      return new Student(student)
    }
  }

  async findByPhone(phone: string): Promise<Student | void> {
    const student = await prisma.student.findFirst({ where: { phone } })

    if (student) {
      return new Student(student)
    }
  }

  async create(data: IStudentData): Promise<Student> {
    const student = await prisma.student.create({
      data
    })

    return new Student(student)
  }

  async update(data: IStudentData, id: string): Promise<Student> {
    const student = await prisma.student.update({
      where: { id },
      data
    })

    return new Student(student)
  }
}
