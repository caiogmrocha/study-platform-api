export class StudentAlreadyExistsError extends Error {
  constructor (email: string) {
    super(`Uma conta com o email ${email} já foi cadastrada.`)
    this.name = 'StudentAlreadyExistsError'
  }
}
