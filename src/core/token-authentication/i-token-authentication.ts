export interface ITokenAuthentication {
  sign(params: any, expiresIn: number): Promise<string>;
}