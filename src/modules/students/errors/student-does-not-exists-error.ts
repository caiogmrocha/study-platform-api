export class StudentDoesNotExistsError extends Error {
  constructor (field: string, fieldName: string) {
    super(`Não foi encontrado nenhum registro com o(a) ${fieldName} "${field}"`)
    this.name = 'StudentDoesNotExistsError'
  }
}
