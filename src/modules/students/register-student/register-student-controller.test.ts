import { app } from '@/app'
import request from 'supertest'

describe('[e2e] Register Student Controller', () => {
  it('should return 422 if invalid data is provided', async () => {
    const response = await request(app).post('/students/register').send({
      name: '', // missing name param
      email: 'any@email.com',
      password: 'any_password',
      phone: '00000000000',
      image: 'path/to/image',
      bio: 'any_bio'
    })

    expect(response.status).toBe(422)
  })
})
