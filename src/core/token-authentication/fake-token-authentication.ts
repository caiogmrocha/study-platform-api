import { ITokenAuthentication } from "@/core/token-authentication/i-token-authentication";
import { randomUUID } from "crypto";

export class FakeTokenAuthentication implements ITokenAuthentication {
  async sign(params: any, expiresIn: number): Promise<string> {
    return String(Date.now())
  }

  async verify(accessToken: string): Promise<any> {
    return { id: randomUUID() }
  }
}
