import { app } from '@/app'
import request from 'supertest'
import { makeStudentAndAuthenticate } from '../tests/make-student-and-authenticate'

describe('[e2e] UpdateStudentController', () => {
  it('should return 401 if student who is authenticated does not match with the provided student id', async () => {
    const { student: firstStudent, token: firstToken } = await makeStudentAndAuthenticate();
    const { student: secondStudent, token: secondToken } = await makeStudentAndAuthenticate();
    const response = await request(app)
      .put(`/students/update/${firstStudent.id}`)
      .set({ authorization: firstToken })
      .send({
        id: secondStudent.id,
        name: 'string',
        email: 'string',
        password: 'string',
        phone: 'string',
        bio: 'string',
      });

    expect(response.status).toBe(401)
  })
})
