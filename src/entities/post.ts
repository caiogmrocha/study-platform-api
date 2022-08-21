import { v4 as uuid } from "uuid";

export interface IPostProps {
  id?: string;
  description: string;
  media_path: string;
}

export class Post {
  props: IPostProps

  constructor ({ id, ...props }: IPostProps) {
    if (!id) {
      id = uuid()
    }

    this.props = { id, ...props }
  }
}
