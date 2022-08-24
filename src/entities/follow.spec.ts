import { randomUUID } from "crypto";
import { Follow } from "./follow";

describe('Follow Entity', () => {
  it('should be able to create a Follow instance', () => {
    const student_id = randomUUID();
    const teacher_id = randomUUID();
    const follow = new Follow({
      id: 1,
      student_id,
      teacher_id,
    })

    expect(follow.props).toEqual(expect.objectContaining({
      id: expect.any(Number),
      student_id,
      teacher_id,
    }))
  })
})
