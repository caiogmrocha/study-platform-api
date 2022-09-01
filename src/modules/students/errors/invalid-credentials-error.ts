export class InvalidCrendentialsError extends Error {
  constructor () {
    super('As credenciais informadas são inválidas.')
    this.name = 'InvalidCrendentialsError'
  }
}
