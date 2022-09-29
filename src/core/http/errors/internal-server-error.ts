export class InternalServerError extends Error {
  constructor () {
    super('Erro Interno do Servidor.')
    this.name = 'InternalServerError'
  }
}
