import { randomUUID } from "crypto";
import { Comment } from "./comment";

describe('Follow Entity', () => {
  it('should be able to create a Follow instance', () => {
    const student_id = randomUUID();
    const post_id = randomUUID();
    const comment = new Comment({
      id: 1,
      student_id,
      post_id,
    })

    expect(comment.props).toEqual(expect.objectContaining({
      id: expect.any(Number),
      student_id,
      post_id,
    }))
  })
})
