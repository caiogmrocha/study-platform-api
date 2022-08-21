import { v4 as uuid } from 'uuid';
import { IFollowProps } from './i-follow-props';

interface IStudentProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  bio: string;

  following?: IFollowProps[]
}

export class Student {
  props: IStudentProps

  get id(): string | null {
    return this.props.id || null
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get phone(): string {
    return this.props.phone
  }

  get image(): string {
    return this.props.image
  }

  get bio(): string {
    return this.props.bio
  }

  constructor ({ id, ...props }: IStudentProps) {
    if (!id) {
      id = uuid();
    }

    this.props = { id, ...props }
  }
}
