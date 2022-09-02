import { ITokenAuthentication } from "@/core/token-authentication/i-token-authentication";
import jwt from 'jsonwebtoken';

export class JwtTokenAuthenticationAdapter implements ITokenAuthentication {
  constructor (
    private readonly secret: string
  ) {}

  async sign(params: any, expiresIn: number): Promise<string> {
    const token = jwt.sign(params, this.secret, {
      expiresIn
    })

    return token
  }
}
