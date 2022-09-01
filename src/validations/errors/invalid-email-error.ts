export class InvalidEmailError extends Error {
  constructor (fieldName: string) {
    super(`O campo ${fieldName} precisa ser um e-mail.`);
    this.name = 'InvalidEmailError';
  }
}
