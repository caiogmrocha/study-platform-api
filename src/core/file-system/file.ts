export interface IFileProps {
  fieldName: string;
  data: Buffer;
  mimeType: string;
  size: number;
}

export class File {
  private readonly props: IFileProps

  constructor (props: IFileProps) {
    this.props = props
  }

  get fieldName(): string {
    return this.props.fieldName
  }

  get data(): Buffer {
    return this.props.data
  }

  get mimeType(): string {
    return this.props.mimeType
  }

  get size(): number {
    return this.props.size
  }
}
