import { Student } from "@/entities/student";
import { IStudentData, IStudentsRepository } from "./i-students-repository";
import { prisma } from "./prisma";

export class PrismaStudentsRepository implements IStudentsRepository {
  async findById(id: string): Promise<void | Student> {
    const student = await prisma.student.findUnique({ where: { id } })

    if (student) {
      return new Student(student)
    }
  }

  async findByEmail(email: string): Promise<void | Student> {
    const student = await prisma.student.findFirst({ where: { email } })

    if (student) {
      return new Student(student)
    }
  }

  async findByPhone(phone: string): Promise<void | Student> {
    const student = await prisma.student.findFirst({ where: { phone } })

    if (student) {
      return new Student(student)
    }
  }

  async create(data: IStudentData): Promise<void> {
    await prisma.student.create({
      data
    })
  }

  async update(data: IStudentData, id: string): Promise<void> {
    await prisma.student.update({
      where: { id },
      data
    })
  }
}
