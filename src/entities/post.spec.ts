import { Post } from "./post"

describe('Post Entity', () => {
  it('should be able to create a Post instance', () => {
    const post = new Post({
      description: 'fake description',
      media_path: 'path/to/media'
    })

    expect(post.props).toEqual(expect.objectContaining({
      id: expect.any(String),
      description: 'fake description',
      media_path: 'path/to/media'
    }))
  })
})
