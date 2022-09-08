import { v4 as uuid } from 'uuid';
import { Comment } from './comment';
import { Follow } from './follow';
import { Like } from './like';

export interface IStudentProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string | null;
  bio: string;

  following?: Follow[];
  likes?: Like[];
  comments?: Comment[];
}

export class Student {
  props: IStudentProps

  get id(): string | undefined {
    return this.props.id || undefined
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

  get image(): string | null {
    return this.props.image
  }

  get bio(): string {
    return this.props.bio
  }

  constructor ({ id, image, ...props }: IStudentProps) {
    if (!id) {
      id = uuid();
    }

    if (!image) {
      image = null;
    }

    this.props = { id, image, ...props }
  }
}
