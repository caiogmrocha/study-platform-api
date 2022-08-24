export interface ICommentProps {
  id: number;
  student_id: string;
  post_id: string;
}

export class Comment {
  props: ICommentProps

  constructor ({ id, ...props }: ICommentProps) {
    if (!id) {
      id = Date.now()
    }

    this.props = { id, ...props }
  }
}
