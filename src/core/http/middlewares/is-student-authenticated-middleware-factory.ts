import { JwtTokenAuthenticationAdapter } from "@/core/token-authentication/jwt-token-authentication-adapter";
import dotenv from 'dotenv';
import { IsStudentAuthenticatedMiddleware } from "./is-student-authenticated-middleware";

dotenv.config()

export const makeIsStudentAuthenticatedMiddleware = () => {
  const tokenAuthentication = new JwtTokenAuthenticationAdapter(process.env.JWT_SECRET || '')
  const isStudentAuthenticatedMiddleware = new IsStudentAuthenticatedMiddleware(tokenAuthentication)

  return isStudentAuthenticatedMiddleware
}
