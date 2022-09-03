import { MinimumValueError } from "../errors/minimum-value-error"
import { MinimumValueValidator } from "./minimum-value-validator"

describe('Minimum Value Validator', () => {
  it('should return MinimumValueError if the provided field is invalid string', () => {
    const anyField = '1234567'
    const sut = new MinimumValueValidator('any_field', anyField, 8)

    const error = sut.validate()

    expect(error).toEqual(new MinimumValueError('any_field', anyField, 8))
  })

  it('should return MinimumValueError if the provided field is invalid number', () => {
    const anyField = 100
    const sut = new MinimumValueValidator('any_field', anyField, 101)

    const error = sut.validate()

    expect(error).toEqual(new MinimumValueError('any_field', anyField, 101))
  })
})
