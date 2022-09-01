import { InvalidEmailError } from "../errors/invalid-email-error"
import { IsEmailValidator } from "./is-email-validator"

describe('Is Email Validator', () => {
  it('should return InvalidEmailError if the provided e-mail is invalid', () => {
    const anyField = 'wrong_email'
    const sut = new IsEmailValidator('email', anyField)

    const error = sut.validate()

    expect(error).toEqual(new InvalidEmailError('email'))
  })
})
