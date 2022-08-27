import { Student } from "@/entities/student";
import { IStudentData, IStudentsRepository } from "./i-students-repository";
import { prisma } from "./prisma";

export class PrismaStudentsRepository implements IStudentsRepository {
  async findByEmail(email: string): Promise<void | Student> {
    const student = await prisma.student.findFirst({ where: { email } })

    if (student) {
      return new Student(student)
    }
  }

  async create(data: IStudentData): Promise<void> {
    await prisma.student.create({
      data
    })
  }
}
