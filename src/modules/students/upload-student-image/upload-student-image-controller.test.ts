import { app } from '@/app'
import request from 'supertest'

describe('[e2e] UploadStudentImageController', () => {
  it('should return 200 if upload student image', async () => {
    const response = await request(app).post('/students/id-upload-image')

    expect(response.status).toBe(200)
  })
})
