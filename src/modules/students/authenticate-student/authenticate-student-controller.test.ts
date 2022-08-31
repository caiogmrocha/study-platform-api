import { app } from '@/app'
import request from 'supertest'

describe('[e2e] AuthenticateStudentController', () => {
  it('should return 200 if authenticate student', async () => {
    const response = await request(app).post('/students/login')

    expect(response.status).toBe(200)
  })
})
