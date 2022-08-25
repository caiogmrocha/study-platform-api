import { Student } from "@/entities/student";

export interface IStudentData {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  bio: string;
}

export interface IStudentsRepository {
  findByEmail(email: string): Promise<Student | void>;
  create(data: IStudentData): Promise<void>;
}
