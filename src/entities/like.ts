export interface ILikeProps {
  id: number;
  student_id: string;
  post_id: string;
}

export class Like {
  props: ILikeProps

  constructor({ id, ...props }: ILikeProps) {
    if (!id) {
      id = Date.now()
    }

    this.props = { id, ...props }
  }
}
