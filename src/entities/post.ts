import { v4 as uuid } from "uuid";
import { ILikeProps } from "./i-like-props";

export interface IPostProps {
  id?: string;
  description: string;
  media_path: string;

  likes?: ILikeProps;
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
