export class MinimumValueError extends Error {
  constructor (fieldName: string, field: unknown, minimum: number) {
    switch (typeof field) {
      case 'string':
        super(`O campo ${fieldName} precisar ter, no mínimo, ${minimum} caracteres.`)
        break

      case 'number':
        super(`O campo ${fieldName} precisar ser maior que ${minimum}.`)
        break

      default:
        super(`O campo ${fieldName} não é válido.`)
        break
    }

    this.name = 'MinimumValueError'
  }
}
