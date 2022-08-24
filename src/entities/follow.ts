export interface IFollowProps {
  id: number;
  student_id: string;
  teacher_id: string;
}

export class Follow {
  props: IFollowProps

  get id(): number {
    return this.props.id
  }

  get student_id(): string {
    return this.props.student_id
  }

  get teacher_id(): string {
    return this.props.teacher_id
  }

  constructor ({ id, ...props }: IFollowProps) {
    if (!id) {
      id = Date.now();
    }

    this.props = { id, ...props }
  }
}
