import { v4 as uuid } from "uuid";
import { IFollowProps } from "./i-follow-props";

export interface ITeacherProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  bio: string;

  followers?: IFollowProps[]
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
