import { ITokenAuthentication } from "@/core/token-authentication/i-token-authentication";
import { AccessDeniedError } from "../errors/access-denied-error";
import { HttpResponse, ok, serverError, unauthorized } from "../i-http-response";
import { IMiddleware } from "../i-middleware";

export interface DecodedJwtToken {
  studentId: string;
}

export interface IsStudentAuthenticatedMiddlewareRequest {
  accessToken: string;
}

export class IsStudentAuthenticatedMiddleware implements IMiddleware<IsStudentAuthenticatedMiddlewareRequest> {
  constructor (
    private readonly tokenAuthentication: ITokenAuthentication
  ) {}

  async handle(request: IsStudentAuthenticatedMiddlewareRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      if (accessToken) {
        const decoded = await this.tokenAuthentication.verify(accessToken) as DecodedJwtToken

        return ok({ studentId: decoded.studentId })
      } else {
        return unauthorized(new AccessDeniedError())
      }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
