export type IMimeTypes = (
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/gif'
  | 'image/x-icon'
)

export type IExtensions = (
  | '.jpg' | '.jpeg' | '.jfif' | '.pjpeg' | '.pjp'
  | '.png'
  | '.svg'
  | '.gif'
  | '.ico' | '.cur'
)

export interface IFileProps {
  fieldName: string;
  data: Buffer;
  mimeType: IMimeTypes;
  size: number;
}

export class File {
  private readonly extensionsToMimes: { [key in IMimeTypes]: Array<IExtensions> } = {
    'image/jpeg': ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/svg+xml': ['.svg'],
    'image/x-icon': ['.ico', '.cur']
  }
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

  get size(): number {
    return this.props.size
  }

  get mimeType(): IMimeTypes {
    return this.props.mimeType
  }

  get extension(): IExtensions {
    return this.extensionsToMimes[this.mimeType][0]
  }
}
