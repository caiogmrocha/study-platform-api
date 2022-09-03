export class MinimumValueError extends Error {
  constructor (fieldName: string, field: unknown, minimum: number) {
    if (Array.isArray(field)) {
      super(`O campo ${fieldName} deveria ter ${minimum} elementos.`)
    } else {
      switch (typeof field) {
        case 'string':
          super(`O campo ${fieldName} precisar ter, no mínimo, ${minimum} caracteres.`)
          break

        case 'number':
          super(`O campo ${fieldName} precisar ser maior que ${minimum}.`)
          break

        case 'object':
          super(`O campo ${fieldName} precisar ter ${minimum} propriedades.`)
          break

        default:
          super(`O campo ${fieldName} não é válido.`)
          break
      }
    }

    this.name = 'MinimumValueError'
  }
}
