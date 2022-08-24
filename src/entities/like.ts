export interface ILikeProps {
  id: number;
  student_id: string;
  post_id: string;
}

export class Like {
  props: ILikeProps

  get id(): number {
    return this.props.id
  }

  get student_id(): string {
    return this.props.student_id
  }

  get post_id(): string {
    return this.props.post_id
  }

  constructor({ id, ...props }: ILikeProps) {
    if (!id) {
      id = Date.now()
    }

    this.props = { id, ...props }
  }
}
