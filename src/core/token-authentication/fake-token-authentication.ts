import { ITokenAuthentication } from "@/core/token-authentication/i-token-authentication";

export class FakeTokenAuthentication implements ITokenAuthentication {
  async sign(params: any, expiresIn: number): Promise<string> {
    return String(Date.now())
  }
}
