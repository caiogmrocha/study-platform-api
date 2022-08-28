export class StudentAlreadyExistsError extends Error {
  constructor (field: string, fieldName: string) {
    super(`Uma conta com o(a) ${fieldName} "${field}" já foi cadastrada.`)
    this.name = 'StudentAlreadyExistsError'
  }
}
