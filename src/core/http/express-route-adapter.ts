import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { File } from '../file-system/file';
import { IController } from './i-controller';

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    let adaptedFiles: { [key: string]: File } = {}

    if (request.files) {
      Object.entries(request.files).forEach(([ key, files ]) => {
        files = files as UploadedFile

        adaptedFiles[key] = new File({
          fieldName: key,
          data: files.data,
          mimeType: files.mimetype,
          size: files.size
        })
      })
    }

    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      files: adaptedFiles
    };

    const httpResponse = await controller.handle(requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error
      });
    }
  };
};
