import path from "path";
import { IFileSystemConfig } from "./i-file-system-config";

export const localDiskFileSystemConfig: IFileSystemConfig = {
  disk: 'local',
  path: path.resolve(__dirname, '..', '..', '..', '..', '..', 'uploads')
}
