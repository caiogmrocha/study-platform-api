export class MinimumValueError extends Error {
  constructor (fieldName: string, field: unknown, minimum: number) {
    if (typeof field === 'string') {
      super(`O campo ${fieldName} não é válido.`);
    } else {
      super(`O campo ${fieldName} precisar ser, no mínimo, ${minimum}.`)
    }

    this.name = 'MinimumValueError';
  }
}
