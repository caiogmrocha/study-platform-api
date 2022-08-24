import { v4 as uuid } from "uuid";
import { Comment } from "./comment";
import { Like } from "./like";

export interface IPostProps {
  id?: string;
  description: string;
  media_path: string;

  likes?: Like[];
  comments?: Comment[];
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
