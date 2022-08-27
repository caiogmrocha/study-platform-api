import { RequiredFieldError } from "../errors/required-field-error"
import { RequiredFieldValidator } from "./required-field-validator"

describe('Required Field Validator', () => {
  it('should return RequiredFieldError if a empty string is provided', () => {
    const anyField = ''
    const sut = new RequiredFieldValidator('any_field', anyField)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if null is provided', () => {
    const anyField = null
    const sut = new RequiredFieldValidator('any_field', anyField)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if undefined is provided', () => {
    const anyField = undefined
    const sut = new RequiredFieldValidator('any_field', anyField)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
