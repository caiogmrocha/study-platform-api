import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "./i-middleware";

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      accessToken: request.headers?.['authorization'],
      ...(request.headers || {})
    }

    const httpResponse = await middleware.handle(requestData)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(request, request.body)

      return next()
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error
      })
    }
  }
}
