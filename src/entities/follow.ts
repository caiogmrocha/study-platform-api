export interface IFollowProps {
  id: number;
  student_id: string;
  teacher_id: string;
}

export class Follow {
  props: IFollowProps

  constructor ({ id, ...props }: IFollowProps) {
    if (!id) {
      id = Date.now();
    }

    this.props = { id, ...props }
  }
}
