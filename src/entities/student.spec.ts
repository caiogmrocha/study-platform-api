import { Student } from "./student"

describe('Student Entity', () => {
  it('should be able to create a Student instance', () => {
    const student = new Student({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
      phone: '087999999999',
      bio: 'fake bio here',
      image: 'path/to/image',
    })

    expect(student).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
      phone: '087999999999',
      bio: 'fake bio here',
      image: 'path/to/image',
    }))
  })
})
