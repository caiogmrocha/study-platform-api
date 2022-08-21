import { v4 as uuid } from "uuid";

export interface ITeacherProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  bio: string;
}

export class Teacher {
  props: ITeacherProps

  constructor ({ id, ...props }: ITeacherProps) {
    if (!id) {
      id = uuid()
    }

    this.props = { id, ...props }
  }
}
