import { Teacher } from "./teacher"

describe('Teacher Entity', () => {
  it('should be able to create a Student instance', () => {
    const teacher = new Teacher({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
      phone: '087999999999',
      bio: 'fake bio here',
      image: 'path/to/image',
    })

    expect(teacher.props).toEqual(expect.objectContaining({
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
